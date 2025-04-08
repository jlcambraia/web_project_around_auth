import logo from "../../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Logotipo em branco da Around The U.S."
        className="header__logo"
      />
      <button className="header__button">Faça o login</button>
    </header>
  );
}
