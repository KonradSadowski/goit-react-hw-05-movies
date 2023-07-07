import React, { useState, useEffect } from 'react';

const API_KEY = 'dbea77d3eb5b3622b027f73f6a5032fe';

export const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&api_key=${API_KEY}`,
          {
            headers: {
              accept: 'application/json',
            },
          }
        );
        const data = await response.json();
        setReviews(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieReviews();
    }
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : (
        <>
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <h4>Author: {review.author}</h4>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
