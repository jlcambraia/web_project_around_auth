import deleteIcon from "../../../../images/delete__icon.svg";
import likeIcon from "../../../../images/like__icon.svg";

import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import DeleteConfirmation from "../Popup/components/DeleteConfirmation/DeleteConfirmation";

export default function Card(props) {
  const { card, onClick, onCardLike, onCardDelete, saving } = props;

  const imagePopup = {
    children: <ImagePopup card={card} />,
  };

  const deleteConfirmationPopup = {
    title: "Tem certeza?",
    children: (
      <DeleteConfirmation
        onCardDelete={onCardDelete}
        card={card}
        saving={saving}
      />
    ),
  };

  const cardLikeButtonClassName = `grid__like-icon ${
    card.isLiked ? "grid__like-icon_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="grid__card">
      <img
        className="grid__img"
        src={card.link}
        alt={`Imagem de ${card.name}`}
        onClick={() => onClick(imagePopup)}
      />
      <button
        className="grid__card-delete-button"
        onClick={() => onClick(deleteConfirmationPopup)}
      >
        <img
          src={deleteIcon}
          alt="Ícone de Deletar"
          className="grid__delete-icon"
        />
      </button>
      <div className="grid__card-footer">
        <h2 className="grid__card-title">{card.name}</h2>
        <button
          className="grid__card-footer-button"
          onClick={() => {
            handleLikeClick(card);
          }}
        >
          <img
            src={likeIcon}
            alt="Ícone de Curtir"
            className={cardLikeButtonClassName}
          />
        </button>
      </div>
    </li>
  );
}
