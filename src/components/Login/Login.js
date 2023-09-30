import { useFormWithValidation } from '../../utils/validate';
import "./Login.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Login({ handleLogin, error, setError }) {
  const { values, handleChange, errors, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.email, values.password);
  };

  useEffect(() => {
    setError("");

    return () => {
      resetForm();
    }
  }, []);

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
          pattern="^[a-zA-Z0-9]([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+){1,}\.([a-zA-Z]+)$"
          onChange={handleChange}
          required
        ></input>
        <span className='authorization-form__input-error'>{errors.email}</span>
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
        <span className='authorization-form__input-error'>{errors.password}</span>
        <p className="authorization-form__err-text">{error}</p>
        <button type="submit" className="authorization-form__button">
          Войти
        </button>
        <p className="authorization-form__link-text">Ещё не зарегистрированы? <Link className="authorization-form__link" to="/signup">Регистрация</Link></p>
      </form>
    </section>
  );
}