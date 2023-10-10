import { useContext, useEffect } from "react";
import { useValidation } from "../../utils/useValidation";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import SubmitButton from "../SubmitButton/SubmitButton";

import './Profile.css';

function Profile({ onLogout, onUpdateUser, readOnly, isEditClicked, onEditUser, onDisableEditUser }) {
  const { values, setValues, errors, isValid, setIsValid, handleChange } = useValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    onDisableEditUser();
  }, []);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  useEffect(() => {
    handleCheckUser();
  }, [values]);

  const handleCheckUser = () => {
    if(values.name === currentUser.name && values.email === currentUser.email) {
      setIsValid(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email } = values;

    onUpdateUser(name, email);
  }

  return (
    <main className="main">
      <section className="profile">
        <form className="profile__form" name="profile-form" onSubmit={handleSubmit} noValidate>
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <div className="profile__inputs">
            <label className="profile__form-label" htmlFor="name">
              Имя
              <input
                className={`profile__form-input ${errors.name ? "profile__form-input_type_error" : ""}`}
                type="text"
                name="name"
                id="name"
                minLength="2"
                maxLength="30"
                placeholder="Ваше имя"
                onChange={handleChange}
                value={values.name || ''}
                readOnly={readOnly}
                autoComplete="off"
                required/>
            </label>
            <label className="profile__form-label" htmlFor="email">
              E-mail
              <input
                className={`profile__form-input ${errors.email ? "profile__form-input_type_error" : ""}`}
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
                onChange={handleChange}
                value={values.email || ''}
                readOnly={readOnly}
                autoComplete="off"
                required/>
            </label>
          </div>
          <div className="profile__btns">
            {isEditClicked
              ?
                <SubmitButton text="Сохранить" label="Сохранить информацию" isValid={isValid} />
              :
                <>
                  <button
                    className="profile__btn hover-opacity-link"
                    type="button"
                    aria-label="Редактировать профиль"
                    onClick={onEditUser}>
                    Редактировать
                  </button>
                  <button
                    className="profile__btn profile__btn_type_signout hover-opacity-link"
                    type="button"
                    aria-label="Выйти из аккаунта"
                    onClick={onLogout}>
                    Выйти из аккаунта
                  </button>
                </>
            }
          </div>
        </form>
      </section>
    </main>
  )
}

export default Profile;