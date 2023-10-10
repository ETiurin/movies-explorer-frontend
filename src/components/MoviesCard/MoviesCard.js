import { useLocation } from 'react-router-dom';

import durationConverter from '../../utils/durationConverter';

import './MoviesCard.css';
import '../App/App.css';

function MoviesCard({ movie, savedMovies, onSaveMovie, onDeleteMovie }) {
  const savedMovie = savedMovies
    ? savedMovies.find((m) => m.movieId === movie.id)
    : '';

  const isSaved = savedMovies
    ? savedMovies.some((m) => m.movieId === movie.id)
    : false;

  const imagePath = movie.image.url
    ? `https://api.nomoreparties.co/${movie.image.url}`
    : movie.image

  let location = useLocation();

  return (
    <li className="card">
      <div className="card__info-wrapper">
        <div className="card__info">
          <h2 className="card__title">{movie.nameRU}</h2>
          <span className="card__duration">{durationConverter(movie.duration)}</span>
        </div>
        {location.pathname === '/movies'
          ? <button
              className={`card__btn card__btn_type_save ${isSaved ? "card__btn_type_save-active" : ""} hover-opacity-btn`}
              type="button"
              name="save-movie"
              aria-label="Добавить в избранное"
              onClick={() => onSaveMovie(movie, savedMovie?._id, isSaved)} />
          : <button
              className="card__btn card__btn_type_delete hover-opacity-btn"
              type="button"
              name="delete-movie"
              aria-label="Убрать из избранного"
              onClick={() => onDeleteMovie(movie._id)} />}
      </div>
      <a className="card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="card__poster" src={imagePath} alt={movie.nameRU} />
      </a>
    </li>
  )
}

export default MoviesCard;