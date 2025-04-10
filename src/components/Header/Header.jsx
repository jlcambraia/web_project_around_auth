import logo from "../../images/logo.svg";
import openMenu from "../../images/header__menu.svg";
import closeMenu from "../../images/close__icon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

export default function Header({ isLoggedIn, setIsLoggedIn, title, userData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {isLoggedIn && isMenuOpen && (
        <div className="header__mobile-menu">
          <div className="header__mobile-menu-content">
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
        </div>
      )}

      <header className="header">
        <img
          src={logo}
          alt="Logotipo em branco da Around The U.S."
          className="header__logo"
        />
        {isLoggedIn ? (
          <>
            <div className="header__buttons header__buttons_mobile-hidden">
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
            <div className="header__buttons header__buttons_desktop-hidden">
              <button className="header__button" onClick={toggleMenu}>
                <img
                  className="header__button-icon"
                  src={isMenuOpen ? closeMenu : openMenu}
                  alt="Ícone de menu para mobile"
                />
              </button>
            </div>
          </>
        ) : (
          <button className="header__button" onClick={buttonNavigate}>
            {title}
          </button>
        )}
      </header>
    </>
  );
}
