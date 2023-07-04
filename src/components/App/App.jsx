import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Home, Movies, NotFound } from 'Pages';

import css from './App.module.css';

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
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
