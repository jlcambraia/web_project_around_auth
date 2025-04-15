import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import avatarPlaceholder from "../images/profile__placeholder.png";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import Register from "./Main/components/Register/Register";
import Login from "./Main/components/Login/Login";

import InfoTooltip from "./Main/components/Popup/components/InfoTooltip/InfoTooltip";

import Popup from "./Main/components/Popup/Popup";

import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import ProtectedRoute from "./ProtectedRout";

import * as auth from "../utils/auth";
import { setToken, getToken } from "../utils/token";

function App() {
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    avatar: avatarPlaceholder,
    name: "Carregando...",
    about: "Carregando...",
  });
  const [saving, setSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const [isRegistered, setIsRegistered] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api
      .getUserInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar informações do usuário");
      });
  }, []);

  useEffect(() => {
    api
      .getCardsInfo()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar cards");
      });
  }, []);

  useEffect(() => {
    if (isRegistered !== null) {
      const infoTooltipPopup = {
        children: <InfoTooltip isRegistered={isRegistered} />,
        title: "",
      };
      handleOpenPopup(infoTooltipPopup);
    }
  }, [isRegistered]);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    auth
      .getUserInfo(token)
      .then((data) => {
        setIsLoggedIn(true);
        setUserData(data.data.email);
      })
      .catch(() => {
        setIsRegistered(false);
      });
  }, []);

  function handleOpenPopup(popupData) {
    setSaving(false);
    setPopup(popupData);
    setError(null);
  }

  function handleClosePopup() {
    setPopup(null);
    setError(null);

    if (isRegistered !== null) {
      setIsRegistered(null);
    }
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api
      .updateLikeState(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => setError(err));
  }

  async function handleCardDelete(card) {
    setSaving(true);
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
        setPopup(null);
      })
      .catch((err) => setError(err));
  }

  const handleUpdateUser = (data) => {
    setSaving(true);
    (async () => {
      await api
        .setUserInfo(data.name, data.about)
        .then((newData) => {
          setCurrentUser(newData);
          setPopup(null);
        })
        .catch((err) => {
          setError(err);
        });
    })();
  };

  const onUpdateAvatar = (data) => {
    setSaving(true);
    (async () => {
      await api
        .changeProfileImage(data)
        .then((newData) => {
          setCurrentUser(newData);
          setPopup(null);
        })
        .catch((err) => {
          setError(err);
        });
    })();
  };

  const handleAddPlaceSubmit = (data) => {
    setSaving(true);
    (async () => {
      await api
        .addNewCard(data.name, data.link)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          setPopup(null);
        })
        .catch((err) => {
          setError(err);
        });
    })();
  };

  const handleRegistration = ({ password, email }) => {
    auth
      .register(password, email)
      .then(() => {
        setIsRegistered(true);
        navigate("/signin");
      })
      .catch(() => {
        setIsRegistered(false);
      });
  };

  const handleLogin = ({ password, email }) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserData(email);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
        }
      })
      .catch(() => {
        setIsRegistered(false);
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        onUpdateAvatar,
        saving,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <div className="body">
                <div className="page">
                  <Header
                    userData={userData}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                  <Main
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    error={error}
                  />
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
              <>
                <div className="body">
                  <div className="page">
                    <Header userData={userData} title="Entrar" />
                    <Login handleLogin={handleLogin} />
                  </div>
                </div>
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
              <>
                <div className="body">
                  <div className="page">
                    <Header userData={userData} title="Faça o Login" />
                    <Register
                      handleRegistration={handleRegistration}
                      isRegistered={isRegistered}
                    />
                  </div>
                </div>
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
