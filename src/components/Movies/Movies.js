import { useState, useEffect } from 'react';
import useResize from '../../utils/useResize';

import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

function Movies({ savedMovies, onSaveMovie, onEmptyReqMessage, onGetMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchReq, setSearchReq] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);

  const foundMovies = localStorage.getItem('foundMovies');
  const movieReq = localStorage.getItem('foundReqMovies');

  let size = useResize();

  useEffect(() => {
    if (movieReq) {
      setSearchReq(JSON.parse(movieReq));
    }
  }, [movieReq]);

  useEffect(() => {
    if (foundMovies) {
      setFilteredMovies(JSON.parse(foundMovies));
    }
  }, [foundMovies]);

  const handleFilterMovie = (req) => {
    onGetMovies(setIsLoading).then((movies) => {
      let filtered = [];
      localStorage.setItem('foundReqMovies', JSON.stringify(req));

      if (req.isShortFilm && !!req.searchValue) {
        filtered = movies.filter(m => {
          return m.duration <= 40 && m.nameRU.toLowerCase().trim().includes(req.searchValue.toLowerCase());
        });

        localStorage.setItem('foundMovies', JSON.stringify(filtered));
        setFilteredMovies(filtered);
      } else if (!req.isShortFilm && !!req.searchValue) {
        filtered = movies.filter(m => {
          return m.nameRU.toLowerCase().trim().includes(req.searchValue.toLowerCase());
        });

        localStorage.setItem('foundMovies', JSON.stringify(filtered));
        setFilteredMovies(filtered);
      }
    })
  };

  return (
    <main className="main">
      <div className={`container ${size.width <= 550 ? "container_movies-mobile" : ""}`}>
        <SearchForm
          searchReq={searchReq}
          onMoviesFilter={handleFilterMovie}
          onEmptyReqMessage={onEmptyReqMessage} />
        {isLoading
          ?
            <Preloader />
          :
            filteredMovies.length
              ?
                <MoviesCardList
                  movies={filteredMovies}
                  savedMovies={savedMovies}
                  onSaveMovie={onSaveMovie} />
              :
                foundMovies &&
                  <p className="movies__not-found">
                    Ничего не найдено.
                  </p>
        }
      </div>
    </main>
  )
}

export default Movies;