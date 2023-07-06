import React, { useState, useEffect } from 'react';
import css from './Cast.module.css';
const API_KEY = 'dbea77d3eb5b3622b027f73f6a5032fe';

export const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=${API_KEY}`,
          {
            headers: {
              accept: 'application/json',
            },
          }
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error(error);
      }
    };

    if (movieId) {
      fetchMovieCast();
    }
  }, [movieId]);

  if (!movieId) {
    return <div>No movie ID provided.</div>;
  }

  return (
    <div>
      <ul className={css.CastList}>
        {cast.map(actor => (
          <li key={actor.id} className={css.ActorItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
