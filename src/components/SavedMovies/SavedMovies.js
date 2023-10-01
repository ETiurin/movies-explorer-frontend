import { useState, useEffect } from 'react';
import useResize from '../../utils/useResize';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies({ savedMovies, onDeleteMovie, onEmptyReqMessage }) {
  const [searchReq, setSearchReq] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);

  let size = useResize();

  const foundMovies = localStorage.getItem('foundSavedMovies');
  const movieReq = localStorage.getItem('foundReqSavedMovies');

  useEffect(() => {
      localStorage.removeItem('foundReqSavedMovies');
      localStorage.removeItem('foundSavedMovies');
  }, []);

  useEffect(() => {
    if (foundMovies) {
      setFilteredMovies(JSON.parse(foundMovies));
    } else {
      setFilteredMovies(savedMovies);
    }
  }, [foundMovies, savedMovies, searchReq]);

  useEffect(() => {
    if (movieReq) {
      setSearchReq(JSON.parse(movieReq));
    } else {
      setSearchReq({ ...movieReq, searchValue: '' });
    }
  }, [movieReq, savedMovies]);

  function moviesFilter (req) {
    let filtered = [];
    localStorage.setItem('foundReqSavedMovies', JSON.stringify(req));

    if (req.isShortFilm) {
      filtered = savedMovies.filter(m => {
        return m.duration <= 40 && m.nameRU.toLowerCase().trim().includes(req.searchValue.toLowerCase());
      });

      localStorage.setItem('foundSavedMovies', JSON.stringify(filtered));
      setFilteredMovies(filtered);
    } else if (!req.isShortFilm) {
      filtered = savedMovies.filter(m => {
        return m.nameRU.toLowerCase().trim().includes(req.searchValue.toLowerCase());
      });

      localStorage.setItem('foundSavedMovies', JSON.stringify(filtered));
      setFilteredMovies(filtered);
    }
  };

  return (
    <main className="main">
      <div className={`container ${size.width <= 550 ? "container_movies-mobile" : ""}`}>
        <SearchForm
          searchReq={searchReq}
          onMoviesFilter={moviesFilter}
          onEmptyReqMessage={onEmptyReqMessage} />
        {filteredMovies.length
          ?
            <MoviesCardList
              movies={filteredMovies}
              onDeleteMovie={onDeleteMovie} />
          :
            foundMovies &&
              <p className="movies__not-found">
                Ничего не найдено.
              </p>}
      </div>
    </main>
  )
}

export default SavedMovies;