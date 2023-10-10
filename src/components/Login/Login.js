import { useValidation } from '../../utils/useValidation';
import AuthRegForm from '../AuthRegForm/AuthRegForm';
import InputForm from '../InputForm/InputForm';

import './Login.css';

function Login({ onLogin }) {
  const { values, errors, isValid, handleChange} = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = values;

    onLogin(email, password);
  }

  return (
    <main className="main">
      <section className="login">
        <AuthRegForm
          btnText="Войти"
          btnLabel="Войти"
          formName="login-form"
          errors={errors}
          isRegister={false}
          isValid={isValid}
          onSubmit={handleSubmit}>
            <InputForm
              inputLabel="E-mail"
              type="email"
              name="email"
              id="email"
              minLength="8"
              maxLength="30"
              placeholder="example@mail.com"
              onChange={handleChange}
              value={values.email || ''}
              error={errors.email}
              errorClassName="input_type_error" />
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
              errorClassName="input_type_error" />
        </AuthRegForm>
      </section>
    </main>
  )
}

export default Login;
