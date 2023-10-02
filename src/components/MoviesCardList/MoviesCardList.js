import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useResize from '../../utils/useResize';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList({ movies, savedMovies, onSaveMovie, onDeleteMovie }) {
  let location = useLocation();
  let size = useResize();

  const [moviesAddCount, setMoviesAddCount] = useState(0);

  useEffect(() => {
    setMoviesAddCount(0);
  }, [movies]);

  const moviesRender = useMemo(() => {
    const count = size.width < 768 ? 5 : size.width < 1280 ? 16 : 20;

    return movies.slice(0, count + moviesAddCount);
  }, [movies, moviesAddCount, size.width]);

  const handleMoreClick = () => {
    setMoviesAddCount(prev => prev + (size.width >= 1280 ? 4 : 4));
  }

  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {moviesRender.map(movie => {
          return <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            savedMovies={savedMovies}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie} />
        })}
      </ul>
      {location.pathname === '/movies'
        ?
        movies.length > moviesRender.length &&
        <div className="movies-cards__more">
          <button
            className="movies-cards__more-btn hover-opacity-btn"
            type="button"
            name="more-btn"
            aria-label="Показать больше фильмов"
            onClick={handleMoreClick}>
            Ещё
          </button>
        </div>
        :
        ""}
    </section>
  )
}

export default MoviesCardList;