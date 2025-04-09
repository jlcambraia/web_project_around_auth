import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login({ handleLogin }) {
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
    handleLogin(data);
  };

  return (
    <div className="login">
      <h2 className="login__title">Entrar</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          name="email"
          className="login__input login__input_margin_s"
          type="email"
          placeholder="E-mail"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          className="login__input login__input_margin_l"
          type="password"
          placeholder="Senha"
          value={data.password}
          onChange={handleChange}
          required
        />
        <button className="login__button" type="submit">
          Entrar
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
