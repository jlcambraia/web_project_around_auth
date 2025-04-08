import { useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function DeleteConfirmation(props) {
  const userContext = useContext(CurrentUserContext);
  const { saving } = userContext;

  const { onCardDelete, card } = props;

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <button
      id="popup__delete-confirmation-button"
      type="submit"
      className={`popup__delete-confirmation-button ${
        saving ? "popup__delete-confirmation-button_disabled" : ""
      }`}
      onClick={handleDeleteClick}
    >
      {saving ? "Excluindo..." : "Sim"}
    </button>
  );
}
