const movieURL = 'https://api.nomoreparties.co';

const shortMoviesDuration = (movie) => {
  return movie.filter(({ duration }) => duration <= 40);
}

export { movieURL, shortMoviesDuration };