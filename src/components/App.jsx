import { useState, useEffect } from "react";

import avatarPlaceholder from "../images/profile__placeholder.png";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

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
    </CurrentUserContext.Provider>
  );
}

export default App;
