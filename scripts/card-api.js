document.addEventListener("DOMContentLoaded",()=>{

const API_KEY="bd13ac6fe638c8c1015fc56ccdb4e56c";
const BASE="https://api.themoviedb.org/3";

// ===== MODAL ELEMENT =====
const modal=document.getElementById("movieModal");
const closeBtn=document.getElementById("closeModal");

const poster=document.getElementById("modalPoster");
const title=document.getElementById("modalTitle");
const score=document.getElementById("modalScore");
const overview=document.getElementById("modalOverview");
const date=document.getElementById("modalDate");
const trailer=document.getElementById("modalTrailer");

const stars=document.querySelectorAll("#modalStars span");
const comment=document.getElementById("modalComment");
const reviewsBox=document.getElementById("modalReviews");
const saveBtn=document.getElementById("saveReviewBtn");

let selectedStars=0;


// ================= CLICK CARD =================
document.querySelectorAll(".movie-card[data-movie]").forEach(card=>{
card.addEventListener("click",()=>{
const name=card.dataset.movie;
loadMovie(name);
});
});


// ================= LOAD MOVIE =================
async function loadMovie(name){

reviewsBox.innerHTML=""; // reset review khi mở phim mới

const res=await fetch(
`${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(name)}`
);

const data=await res.json();
if(!data.results.length)return;

const movie=data.results[0];


// POSTER
poster.src=movie.poster_path
?`https://image.tmdb.org/t/p/w500${movie.poster_path}`
:"";


// TEXT
title.textContent=movie.title;
overview.textContent=movie.overview||"Không có mô tả";
date.textContent="Release: "+movie.release_date;


// ===== SCORE %
const percent=movie.vote_average
?Math.round(movie.vote_average*10)
:0;

score.innerHTML=`
<div style="
width:90px;
height:90px;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
font-weight:bold;
font-size:20px;
color:white;
background:conic-gradient(#22c55e ${percent}%, #333 0);
box-shadow:0 0 15px rgba(0,0,0,.5);
">
${percent}%
</div>
`;


// ===== TRAILER
const v=await fetch(
`${BASE}/movie/${movie.id}/videos?api_key=${API_KEY}`
);
const vd=await v.json();

const tr=vd.results.find(
x=>x.site==="YouTube"&&x.type==="Trailer"
);

trailer.src=tr
?`https://www.youtube.com/embed/${tr.key}`
:"";


// ===== OPEN MODAL
modal.style.display="flex";
}



// ================= STAR CLICK =================
stars.forEach((star,i)=>{
star.onclick=()=>{
selectedStars=i+1;
stars.forEach((s,index)=>{
s.style.color=index<selectedStars?"#facc15":"#777";
});
};
});


// ================= SAVE REVIEW =================
saveBtn.onclick=()=>{

if(selectedStars===0){
alert("Hãy chọn số sao ⭐");
return;
}

const text=comment.value.trim();

const review=document.createElement("div");
review.style.borderBottom="1px solid #333";
review.style.margin="10px 0";
review.style.padding="8px 0";

review.innerHTML=`
<div style="color:#facc15">${"★".repeat(selectedStars)}</div>
${text?`<div style="color:#ccc">${text}</div>`:""}
`;

reviewsBox.prepend(review);

// reset
comment.value="";
selectedStars=0;
stars.forEach(s=>s.style.color="#777");

};



// ================= CLOSE MODAL =================
closeBtn.onclick=()=>modal.style.display="none";

window.onclick=e=>{
if(e.target===modal) modal.style.display="none";
};

});