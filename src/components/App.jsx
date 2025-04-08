import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import avatarPlaceholder from "../images/profile__placeholder.png";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import Register from "./Main/components/Register/Register";
import Login from "./Main/components/Login/Login";

import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import ProtectedRoute from "./ProtectedRout";

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
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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

  function handleOpenPopup(popup) {
    setSaving(false);
    setPopup(popup);
    setError(null);
  }

  function handleClosePopup() {
    setPopup(null);
    setError(null);
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

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, onUpdateAvatar, saving }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <div className="body">
                <div className="page">
                  <Header />
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
            <>
              <div className="body">
                <div className="page">
                  <Header />
                  <Login />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <div className="body">
                <div className="page">
                  <Header />
                  <Register />
                </div>
              </div>
            </>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
