const movieId = main.id;

fetch(`https://example-api.com/movie/${movieId}`)
  .then(response => response.json())
  .then(data => {
    const embedLink = data.embed_url;

    // truyền link sang watch.html
    document.querySelector("#watch-now-btn").href =
      `./watch.html?link=${encodeURIComponent(embedLink)}`;
  })
  .catch(error => {
    console.error("Lỗi khi lấy link phim:", error);
  });
