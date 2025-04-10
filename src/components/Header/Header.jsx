import logo from "../../images/logo.svg";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

export default function Header({ isLoggedIn, setIsLoggedIn, title, userData }) {
  const navigate = useNavigate();

  function signOut() {
    removeToken();
    navigate("/signin");
    setIsLoggedIn(false);
  }

  function buttonNavigate() {
    const headerButton = document.querySelector(".header__button");
    if (headerButton.textContent == "Entrar") {
      return navigate("/signup");
    }
    return navigate("/signin");
  }

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logotipo em branco da Around The U.S."
        className="header__logo"
      />
      {isLoggedIn ? (
        <div>
          <button className="header__button header__button_profile">
            {userData}
          </button>
          <button
            onClick={signOut}
            className="header__button header__button_logout"
          >
            Sair
          </button>
        </div>
      ) : (
        <button className="header__button" onClick={buttonNavigate}>
          {title}
        </button>
      )}
    </header>
  );
}
