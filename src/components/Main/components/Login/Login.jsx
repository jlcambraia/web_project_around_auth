import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import visibility from "../../../../images/visibility.svg";
import visibilityOff from "../../../../images/visibility_off.svg";

export default function Login({ handleLogin }) {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEmailChange = (evt) => {
    const input = evt.target;
    setData({
      ...data,
      email: input.value,
    });

    setErrors({
      ...errors,
      email: input.validationMessage,
    });
  };

  const handlePasswordChange = (evt) => {
    const input = evt.target;
    setData({
      ...data,
      password: input.value,
    });

    setErrors({
      ...errors,
      password: input.validationMessage,
    });
  };

  useEffect(() => {
    setIsFormValid(
      data.email.trim() !== "" &&
        data.password.trim() !== "" &&
        !errors.email &&
        !errors.password
    );
  }, [data, errors]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    if (form.checkValidity()) {
      try {
        setIsSubmitting(true);
        handleLogin(data);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const emailInput = form.elements.email;
      const passwordInput = form.elements.password;

      setErrors({
        email: emailInput.validationMessage,
        password: passwordInput.validationMessage,
      });
    }
  };

  function toggleShowPassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="login">
      <h2 className="login__title">Entrar</h2>
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <div className="login__input-wrapper">
          <input
            name="email"
            className="login__input login__input_margin_s"
            type="email"
            placeholder="E-mail"
            required
            value={data.email}
            onChange={handleEmailChange}
            autoComplete="username"
          />
          <span
            className={`login__input-error ${
              errors.email ? "" : "login__input-error_hidden"
            }`}
          >
            {errors.email}
          </span>
        </div>
        <div className="login__input-wrapper">
          <input
            id="login-password"
            name="password"
            className="login__input login__input_margin_l"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Senha"
            required
            minLength="8"
            value={data.password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
          <span className="login__input-visibility-button">
            <img
              className="login__input-visibility-icon"
              src={isPasswordVisible ? visibility : visibilityOff}
              alt="Ícone para mostrar ou esconder password"
              onClick={toggleShowPassword}
            />
          </span>
          <span
            className={`login__input-error login__input-error_positioned-top ${
              errors.password ? "" : "login__input-error_hidden"
            }`}
          >
            {errors.password}
          </span>
        </div>
        <button
          className={`login__button ${
            !isFormValid || isSubmitting ? "login__button_disabled" : ""
          }`}
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="login__sign-up-text">
        Ainda não é membro?{" "}
        <Link to="/signup" className="login__sign-up-link">
          Inscreva-se aqui!
        </Link>
      </p>
    </div>
  );
}
