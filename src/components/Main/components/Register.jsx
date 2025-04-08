export default function Register() {
  return (
    <div className="register">
      <h2 className="register__title">Inscrever-se</h2>
      <form className="register__form">
        <input
          className="register__input register__input_margin_s"
          type="email"
          placeholder="E-mail"
        />
        <input
          className="register__input register__input_margin_l"
          type="password"
          placeholder="Senha"
        />
      </form>
      <button className="register__button">Inscrever-se</button>
      <p className="register__sign-up-text">
        Já é um membro? Faça o login aqui!
      </p>
    </div>
  );
}
