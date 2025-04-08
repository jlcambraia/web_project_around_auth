import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser, saving } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);
  const [errors, setErrors] = useState({ name: "", about: "" });
  const [isEdited, setIsEdited] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    setErrors({ ...errors, name: evt.target.validationMessage });
    setIsEdited(true);
  };

  const handleAboutChange = (evt) => {
    setAbout(evt.target.value);
    setErrors({ ...errors, about: evt.target.validationMessage });
    setIsEdited(true);
  };

  useEffect(() => {
    setIsFormValid(
      isEdited &&
        name.trim() !== "" &&
        about.trim() !== "" &&
        !errors.name &&
        !errors.about
    );
  }, [name, about, errors, isEdited]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      handleUpdateUser({ name, about });
    } else {
      setErrors({
        name: evt.target.elements.name.validationMessage,
        about: evt.target.elements.about.validationMessage,
      });
    }
  };

  return (
    <form className="popup__form" name="edit-popup" onSubmit={handleSubmit}>
      <div className="popup__input-wrapper">
        <input
          name="name"
          id="popup__input-name"
          className={`popup__input ${
            errors.name ? "popup__input_type_error" : ""
          }`}
          type="text"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span
          id="popup__input-name-error"
          className={`popup__input-error ${
            errors.name ? "" : "popup__input-error_hidden"
          }`}
        >
          {errors.name}
        </span>
      </div>
      <div className="popup__input-wrapper">
        <input
          name="about"
          id="popup__input-about"
          className={`popup__input popup__input_margin-large ${
            errors.about ? "popup__input_type_error" : ""
          }`}
          type="text"
          placeholder="Sobre mim"
          minLength="2"
          maxLength="200"
          required
          value={about}
          onChange={handleAboutChange}
        />
        <span
          id="popup__input-about-error"
          className={`popup__input-error popup__input-error_positioned-top ${
            errors.about ? "" : "popup__input-error_hidden"
          }`}
        >
          {errors.about}
        </span>
      </div>
      <button
        id="popup__save-edit-button"
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
