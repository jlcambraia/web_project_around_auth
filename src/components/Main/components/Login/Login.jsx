import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login">
      <h2 className="login__title">Entrar</h2>
      <form className="login__form">
        <input
          className="login__input login__input_margin_s"
          type="email"
          placeholder="E-mail"
        />
        <input
          className="login__input login__input_margin_l"
          type="password"
          placeholder="Senha"
        />
      </form>
      <button className="login__button">Entrar</button>
      <p className="login__sign-up-text">
        Ainda não é membro?{" "}
        <Link to="/signup" className="login__sign-up-link">
          Inscreva-se aqui!
        </Link>
      </p>
    </div>
  );
}
