import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Static demo API key to make it work instantly out-of-the-box
  const API_KEY = '38b435ad'; 

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setMovies([]);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No results found.");
      }
    } catch (err) {
      setError("Something went wrong. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>🎬 MovieVerse</h1>
        <form onSubmit={searchMovies} className="search-form">
          <input
            type="text"
            placeholder="Search for a movie (e.g., Batman, Avengers)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main>
        {loading && <div className="status-message">Loading movies...</div>}
        {error && <div className="status-message error">{error}</div>}

        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img 
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster+Available"} 
                alt={movie.Title} 
              />
              <div className="movie-details">
                <h3>{movie.Title}</h3>
                <span>{movie.Year}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;