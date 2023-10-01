class MainApi {
  constructor({ url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _isResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(res => this._isResponse(res))
  }

  patchProfileInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email
      })
    })
    .then(res => this._isResponse(res))
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, { headers: this._headers })
      .then(res => this._isResponse(res))
  }

  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        movieId: movie.id,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
        trailerLink: movie.trailerLink,
        year: movie.year
      })
    })
    .then(res => this._isResponse(res))
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._isResponse(res))
  }
}

export default MainApi;