class MoviesApi {
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

  getData() {
    return fetch(`${this._url}`, { headers: this._headers })
      .then(res => this._isResponse(res))
  }
}

const moviesApi = new MoviesApi({
url: 'https://api.nomoreparties.co/beatfilm-movies',
headers: {
  'Content-Type': 'application/json'
}
});

export default moviesApi;