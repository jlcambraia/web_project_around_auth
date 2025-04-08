import { useContext, useRef, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const userContext = useContext(CurrentUserContext);
  const { onUpdateAvatar, saving } = userContext;

  const inputRef = useRef();
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleLinkChange = (evt) => {
    const input = evt.target;
    setError(input.validationMessage);
    setIsFormValid(input.validity.valid);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;
    if (form.checkValidity()) {
      onUpdateAvatar({
        avatar: inputRef.current.value,
      });
    } else {
      setError(inputRef.current.validationMessage);
      setIsFormValid(false);
    }
  }

  return (
    <form
      className="popup__form"
      name="change-profile-picture-popup"
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          name="link"
          id="popup__input-change-profile-link"
          className={`popup__input popup__input_margin-large ${
            error ? "popup__input_type_error" : ""
          }`}
          type="url"
          placeholder="Link da imagem"
          required
          ref={inputRef}
          onChange={handleLinkChange}
        />
        <span
          id="popup__input-change-profile-link-error"
          className={`popup__input-error popup__input-error_positioned-top ${
            error ? "" : "popup__input-error_hidden"
          }`}
        >
          {error}
        </span>
      </div>
      <button
        id="popup__change-profile-picture-button"
        type="submit"
        className={`popup__save-button ${
          !isFormValid || saving ? "popup__save-button_disabled" : ""
        }`}
        disabled={!isFormValid || saving}
      >
        {saving ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
