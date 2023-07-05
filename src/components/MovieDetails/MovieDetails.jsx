import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import css from './MovieDetails.module.css';

const API_KEY = 'dbea77d3eb5b3622b027f73f6a5032fe';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showCast, setShowCast] = useState(false); // Dodatkowy stan do kontrolowania widoczności obsady

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`,
          {
            headers: {
              accept: 'application/json',
            },
          }
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { title, poster_path, overview, vote_average, genres } = movie;

  const handleCastClick = () => {
    setShowCast(true);
  };

  return (
    <div>
      <Link to="/movies">Back to Movies</Link>
      <div className={css.MovieDetailsWrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <div className={css.MovieInfoWrapper}>
          <h2>{title}</h2>
          <p>User Score: {(vote_average * 10).toFixed()}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className={css.AdditionalInformation}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`} onClick={handleCastClick}>
              Cast
            </Link>
          </li>
        </ul>
        {showCast && (
          <div className="DivForCastDisplay">
            <Outlet />{' '}
            {/* Wyświetlanie komponentu Cast wewnątrz DivForCastDisplay */}
          </div>
        )}
      </div>
    </div>
  );
};
