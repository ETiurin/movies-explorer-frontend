import React from "react";
import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formValue.email, formValue.password)
  };

  return (
    <section className="authorization-form">
      <form className="authorization-form" onSubmit={handleSubmit}>
        <Link to="/" className="authorization-form__logo"></Link>
        <h1 className="authorization-form__title">Рады видеть!</h1>
        <label className="authorization-form__input-label">E-mail</label>
        <input
          type="email"
          className="authorization-form__input authorization-form__input_type_email"
          name="email"
          minLength="2"
          maxLength="30"
          placeholder="email"
          onChange={handleChange}
          required
        ></input>
        <span className='authorization-form__input-error authorization-form__input-error_type_email'>Что-то пошло не так...</span>
        <label className="authorization-form__input-label">Пароль</label>
        <input
          type="password"
          className="authorization-form__input authorization-form__input_type_password"
          name="password"
          minLength="8"
          maxLength="30"
          placeholder="Пароль"
          onChange={handleChange}
          required
        ></input>
        <span className='authorization-form__input-error authorization-form__input-error_type_password'>Что-то пошло не так...</span>
        <button type="submit" className="authorization-form__button">
          Войти
        </button>
        <p className="authorization-form__link-text">Ещё не зарегистрированы? <Link className="authorization-form__link" to="/signup">Регистрация</Link></p>
      </form>
    </section>
  );
}