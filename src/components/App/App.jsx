import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { lazy, Suspense } from 'react';
import css from './App.module.css';
const Home = lazy(() => import('../../Pages/Home/Home'));
const Movies = lazy(() => import('../../Pages/Movies/Movies'));
const NotFound = lazy(() => import('../../Pages/NotFound/NotFound'));
const MovieDetails = lazy(() => import('../MovieDetails/MovieDetails'));

const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;

  &.active {
    color: orange;
  }
`;

export const App = () => {
  return (
    <div>
      <nav className={css.nav}>
        <StyledLink to="/" end>
          Home
        </StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/movies"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Movies />
            </Suspense>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MovieDetails />
            </Suspense>
          }
        >
          {/* ... */}
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};
