import { useContext, useEffect } from "react";

import avatarIcon from "../../images/profile__icon.png";
import editIcon from "../../images/edit__icon.svg";
import addIcon from "../../images/add__icon.svg";

import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import ErrorPopup from "./components/Popup/components/ErrorPopup/ErrorPopup";

import Card from "./components/Card/Card";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Main(props) {
  const {
    onOpenPopup,
    cards,
    onCardLike,
    onCardDelete,
    onAddPlaceSubmit,
    error,
  } = props;

  const hasCards = cards && cards.length > 0;

  const { currentUser } = useContext(CurrentUserContext);

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const newCardPopup = {
    title: "Novo local",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };
  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };

  useEffect(() => {
    if (error) {
      const errorPopup = {
        title: "Ops! Tivemos um erro:",
        children: <ErrorPopup error={error} />,
      };
      onOpenPopup(errorPopup);
    }
  }, [error, onOpenPopup]);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__picture-container"
          onClick={() => onOpenPopup(editAvatarPopup)}
        >
          <img
            src={currentUser.avatar}
            alt="Placeholder para Foto de Perfil do Usuário"
            className="profile__picture"
          />
          <img
            src={avatarIcon}
            alt="Ícone de Editar para o Perfil do Usuário"
            className="profile__icon"
          />
        </div>

        <div className="profile__user-info">
          <div className="profile__user-container">
            <h1 className="profile__user-name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              onClick={() => onOpenPopup(editProfilePopup)}
            >
              <img
                src={editIcon}
                alt="Ícone de Editar Perfil"
                className="profile__edit-button-icon"
              />
            </button>
          </div>

          <p className="profile__user-about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img
            src={addIcon}
            alt="Ícone de Adicionar Foto"
            className="profile__add-button-icon"
          />
        </button>
      </section>
      <section className="grid">
        {!hasCards ? (
          <div className="grid__without-cards">
            <p className="grid__without-cards-text">Não há nenhum card</p>
          </div>
        ) : (
          <ul className="grid__card-container">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                isLiked={card.isLiked}
                onClick={onOpenPopup}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
