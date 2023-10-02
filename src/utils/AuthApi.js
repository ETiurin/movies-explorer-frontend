class AuthApi {
  constructor({ url }) {
    this._url = url;
  }

  _isResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    .then(res => this._isResponse(res))
  };

  authorization(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => this._isResponse(res))
  };

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }
    })
    .then(res => this._isResponse(res))
  };
}

const authApi = new AuthApi({
  url: "https://api.ETiurin.nomoredomainsicu.ru",
});

export default authApi;