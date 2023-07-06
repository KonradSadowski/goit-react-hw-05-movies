import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';

export const Movies = () => {
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState([]);

  const handleKeywordChange = event => {
    setKeyword(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=dbea77d3eb5b3622b027f73f6a5032fe&language=en-US&query=${keyword}&page=1&include_adult=false`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={keyword} onChange={handleKeywordChange} />
      <button onClick={handleSearch}>Search</button>
      <Suspense>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
};
