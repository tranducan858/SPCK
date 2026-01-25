import { TMDB_API_KEY } from "./config.js";

(async () => {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  // API endpoints
  const endpoints = {
    trending: "/trending/movie/week",
    popular: "/movie/popular",
    topRated: "/movie/top_rated",
    nowPlaying: "/movie/now_playing",
    upcoming: "/movie/upcoming"
  };

  // Fetch movies from API
  const fetchMovies = async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error(`Error fetching movies from ${endpoint}:`, error);
      return [];
    }
  };

  // Create movie card HTML
  const createMovieCard = (movie) => {
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : './assets/placeholder.jpg';

    return `
      <div class="movie-card" data-id="${movie.id}" onclick="window.location.href='./info.html?id=${movie.id}'">
        <img src="${posterPath}" alt="${movie.title || movie.name}" loading="lazy" />
        <div class="overlay">
          <h3>${movie.title || movie.name}</h3>
          <p>${movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</p>
        </div>
        <button class="play-btn" onclick="event.stopPropagation(); window.location.href='./watch.html?id=${movie.id}'">
          <i class="fa-solid fa-play"></i>
        </button>
      </div>
    `;
  };

  // Load movies into grid
  const loadMoviesIntoGrid = async (endpoint, gridId, limit = 12) => {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const movies = await fetchMovies(endpoint);
    const limitedMovies = movies.slice(0, limit);

    grid.innerHTML = limitedMovies.map(createMovieCard).join('');

    // Add fade-in animation
    const cards = grid.querySelectorAll('.movie-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  };

  // Set up hero section
  const setupHero = async () => {
    const trendingMovies = await fetchMovies(endpoints.trending);
    if (trendingMovies.length === 0) return;

    const featuredMovie = trendingMovies[0];
    const backdropPath = featuredMovie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
      : '';

    const posterPath = featuredMovie.poster_path
      ? `https://image.tmdb.org/t/p/w500${featuredMovie.poster_path}`
      : './assets/placeholder.jpg';

    // Set hero background
    const heroBackground = document.getElementById('hero-background');
    if (heroBackground && backdropPath) {
      heroBackground.style.backgroundImage = `url(${backdropPath})`;
      heroBackground.style.backgroundSize = 'cover';
      heroBackground.style.backgroundPosition = 'center';
    }

    // Set hero poster
    const heroPoster = document.getElementById('hero-poster');
    if (heroPoster) {
      heroPoster.src = posterPath;
      heroPoster.alt = featuredMovie.title || featuredMovie.name;
    }

    // Update hero text
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');

    if (heroTitle) {
      heroTitle.textContent = featuredMovie.title || featuredMovie.name;
    }

    if (heroDescription) {
      heroDescription.textContent = featuredMovie.overview || 'Discover this amazing movie and many more on Phim Mới Cinema.';
    }
  };

  // Search functionality
  const setupSearch = () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const performSearch = () => {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `./search.html?q=${encodeURIComponent(query)}`;
      }
    };

    if (searchBtn) {
      searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          performSearch();
        }
      });
    }
  };

  // Initialize the page
  const init = async () => {
    try {
      // Load hero section
      await setupHero();

      // Load movie grids
      await Promise.all([
        loadMoviesIntoGrid(endpoints.trending, 'trending-grid'),
        loadMoviesIntoGrid(endpoints.popular, 'popular-grid'),
        loadMoviesIntoGrid(endpoints.topRated, 'top-rated-grid'),
        loadMoviesIntoGrid(endpoints.nowPlaying, 'now-playing-grid'),
        loadMoviesIntoGrid(endpoints.upcoming, 'upcoming-grid')
      ]);

      // Setup search
      setupSearch();

      // Hide loading backdrop
      const backdrop = document.querySelector('.backdrop');
      if (backdrop) {
        backdrop.classList.add('backdrop-hidden');
      }

    } catch (error) {
      console.error('Error initializing home page:', error);
    }
  };

  // Start the application
  await init();

})();
