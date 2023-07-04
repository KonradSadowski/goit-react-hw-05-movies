import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmVhNzdkM2ViNWIzNjIyYjAyN2Y3M2Y2YTUwMzJmZSIsInN1YiI6IjY0NjhiMmJmMDA2YjAxMDBlNmI0MmM5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1VUxBUDK8YV65ZE5xGvJMCy9FmMh6r8jtq3iJWwizgg',
      },
    };

    fetch(
      'https://api.themoviedb.org/3/trending/all/day?language=en-US',
      options
    )
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title || movie.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
