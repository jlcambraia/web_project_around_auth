import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register({ handleRegistration }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegistration(data);
  };

  return (
    <div className="register">
      <h2 className="register__title">Inscrever-se</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          name="email"
          className="register__input register__input_margin_s"
          type="email"
          placeholder="E-mail"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          className="register__input register__input_margin_l"
          type="password"
          placeholder="Senha"
          value={data.password}
          onChange={handleChange}
          required
        />
        <button className="register__button" type="submit">
          Inscrever-se
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
