import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import visibility from "../../../../images/visibility.svg";
import visibilityOff from "../../../../images/visibility_off.svg";

export default function Register({ handleRegistration }) {
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
        handleRegistration(data);
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
    <div className="register">
      <h2 className="register__title">Inscrever-se</h2>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <div className="register__input-wrapper">
          <input
            name="email"
            className={`register__input register__input_margin_s ${
              errors.email ? "register__input_type_error" : ""
            }`}
            type="email"
            placeholder="E-mail"
            required
            value={data.email}
            onChange={handleEmailChange}
            autoComplete="username"
          />
          <span
            className={`register__input-error ${
              errors.email ? "" : "register__input-error_hidden"
            }`}
          >
            {errors.email}
          </span>
        </div>
        <div className="register__input-wrapper">
          <input
            id="register-password"
            name="password"
            className="register__input register__input_margin_l"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Senha"
            required
            minLength="8"
            maxLength="30"
            value={data.password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
          <span className="register__input-visibility-button">
            <img
              className="register__input-visibility-icon"
              src={isPasswordVisible ? visibility : visibilityOff}
              alt="Ícone para mostrar ou esconder password"
              onClick={toggleShowPassword}
            />
          </span>
          <span className="register__input-error register__input-error_positioned-top">
            {errors.password}
          </span>
        </div>
        <button
          className={`register__button ${
            !isFormValid || isSubmitting ? "register__button_disabled" : ""
          }`}
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "Inscrevendo..." : "Inscrever-se"}
        </button>
      </form>

      <p className="register__sign-up-text">
        Já é um membro?{" "}
        <Link to="/signin" className="register__sign-up-link">
          Faça o login aqui!
        </Link>
      </p>
    </div>
  );
}
