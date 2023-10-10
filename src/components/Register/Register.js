import { useValidation } from "../../utils/useValidation";

import AuthRegForm from '../AuthRegForm/AuthRegForm';
import InputForm from '../InputForm/InputForm';

import './Register.css';

function Register({ onRegister }) {
  const { values, errors, isValid, handleChange } = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = values;

    onRegister(name, email, password);
  }

  return (
    <main className="main">
      <section className="register">
        <AuthRegForm
          btnText="Зарегистрироваться"
          btnLabel="Зарегистрироваться"
          formName="register-form"
          errors={errors}
          isRegister={true}
          isValid={isValid}
          onSubmit={handleSubmit}
          >
          <InputForm
            inputLabel="Имя"
            type="text"
            name="name"
            id="name"
            minLength="2"
            maxLength="30"
            placeholder="Ваше имя"
            onChange={handleChange}
            value={values.name || ''}
            error={errors.name}
            errorClassName="input_type_error"
          />
          <InputForm
            inputLabel="E-mail"
            type="email"
            name="email"
            id="email"
            minLength="2"
            maxLength="30"
            placeholder="example@mail.com"
            onChange={handleChange}
            value={values.email || ''}
            error={errors.email}
            errorClassName="input_type_error"
          />
          <InputForm
            inputLabel="Пароль"
            type="password"
            name="password"
            id="password"
            minLength="6"
            maxLength="30"
            placeholder="Ваш пароль"
            onChange={handleChange}
            value={values.password || ''}
            error={errors.password}
            errorClassName="input_type_error"
          />
        </AuthRegForm>
      </section>
    </main>
  )
}

export default Register;