const ACCESS_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDEzYWM2ZmU2MzhjOGMxMDE1ZmM1NmNjZGI0ZTU2YyIsIm5iZiI6MTc3MTg2MDYwOC45NDUsInN1YiI6IjY5OWM3MjgwMTU3OGJhZWI3NGZjMmZlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MENEQWVdGm4u9gdF6T1xPkqbhgTXG0b16GDMtd3bYlo";

document.addEventListener("DOMContentLoaded",()=>{

  const modal=document.getElementById("movieModal");
  const closeBtn=document.getElementById("closeModal");

  let currentMovie=null;
  let rating=0;

  closeBtn.onclick=()=>modal.classList.remove("show");
  modal.onclick=e=>{ if(e.target===modal) modal.classList.remove("show"); };

  /* chọn sao */
  document.querySelectorAll("#modalStars span").forEach((s,i)=>{
    s.onclick=()=>{
      rating=i+1;
      document.querySelectorAll("#modalStars span")
        .forEach((x,idx)=>x.classList.toggle("active",idx<rating));
    };
  });

  /* lưu review */
  document.getElementById("saveReviewBtn").onclick=()=>{
    const text=document.getElementById("modalComment").value.trim();
    if(!currentMovie || !rating || !text) return;

    const key="reviews_"+currentMovie.id;
    const list=JSON.parse(localStorage.getItem(key)||"[]");
    list.push({rating,text});
    localStorage.setItem(key,JSON.stringify(list));

    document.getElementById("modalComment").value="";
    rating=0;
    loadReviews();
    document.querySelectorAll("#modalStars span").forEach(s=>s.classList.remove("active"));
  };

  function loadReviews(){
    const key="reviews_"+currentMovie.id;
    const list=JSON.parse(localStorage.getItem(key)||"[]");

    const box=document.getElementById("modalReviews");
    box.innerHTML="";
    list.slice().reverse().forEach(r=>{
      const div=document.createElement("div");
      div.className="review";
      div.innerHTML=`${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}<br>${r.text}`;
      box.appendChild(div);
    });
  }

  /* click card */
  document.querySelectorAll(".movie-card").forEach(card=>{

    card.onclick=async()=>{

      const movieName=card.dataset.movie;
      if(!movieName) return;

      const res=await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&language=vi-VN`,
        {headers:{Authorization:`Bearer ${ACCESS_TOKEN}`}}
      );

      const data=await res.json();
      if(!data.results?.length) return;

      const movie=data.results[0];
      currentMovie=movie;

      const percent=Math.round((movie.vote_average||0)*10);

      /* HERO UPDATE */
      document.getElementById("hero-title").textContent=movie.title;
      document.getElementById("hero-description").textContent=movie.overview||"";

      if(movie.backdrop_path){
        const bg=document.getElementById("hero-background");
        bg.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
        bg.style.backgroundSize="cover";
        bg.style.backgroundPosition="center";
      }

      let heroScore=document.getElementById("heroScoreCircle");
      if(!heroScore){
        heroScore=document.createElement("div");
        heroScore.id="heroScoreCircle";
        heroScore.className="hero-score";
        heroScore.style.position="absolute";
        heroScore.style.right="40px";
        heroScore.style.bottom="40px";
        document.querySelector(".hero").appendChild(heroScore);
      }
      heroScore.style.setProperty("--percent",percent+"%");
      heroScore.innerHTML=`<span>${percent}%</span>`;

      /* MODAL INFO */
      document.getElementById("modalTitle").textContent=movie.title;
      document.getElementById("modalOverview").textContent=movie.overview||"";
      document.getElementById("modalDate").textContent=movie.release_date||"";

      document.getElementById("modalPoster").src=
        movie.poster_path?`https://image.tmdb.org/t/p/w500${movie.poster_path}`:"";

      const modalScore=document.getElementById("modalScore");
      modalScore.style.setProperty("--percent",percent+"%");
      modalScore.innerHTML=`<span>${percent}%</span>`;

      /* TRAILER */
      const v=await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        {headers:{Authorization:`Bearer ${ACCESS_TOKEN}`}}
      );
      const vd=await v.json();

      const trailer=vd.results.find(x=>x.site==="YouTube" && x.type==="Trailer");
      document.getElementById("modalTrailer").src=
        trailer?`https://www.youtube.com/embed/${trailer.key}`:"";

      loadReviews();
      modal.classList.add("show");
    };

  });

});