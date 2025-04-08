import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function NewCard(props) {
  const userContext = useContext(CurrentUserContext);
  const { saving } = userContext;

  const { onAddPlaceSubmit } = props;

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    link: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (evt) => {
    const input = evt.target;
    setName(input.value);

    setErrors({
      ...errors,
      name: input.validationMessage,
    });
  };

  const handleLinkChange = (evt) => {
    const input = evt.target;
    setLink(input.value);

    setErrors({
      ...errors,
      link: input.validationMessage,
    });
  };

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" && link.trim() !== "" && !errors.name && !errors.link
    );
  }, [name, link, errors]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    if (form.checkValidity()) {
      onAddPlaceSubmit({ name, link });
    } else {
      const nameInput = form.elements.name;
      const linkInput = form.elements.link;

      setErrors({
        name: nameInput.validationMessage,
        link: linkInput.validationMessage,
      });
    }
  };

  return (
    <form className="popup__form" name="add-popup" onSubmit={handleSubmit}>
      <div className="popup__input-wrapper">
        <input
          name="name"
          id="popup__input-title"
          className={`popup__input ${
            errors.name ? "popup__input_type_error" : ""
          }`}
          type="text"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span
          id="popup__input-title-error"
          className={`popup__input-error ${
            errors.name ? "" : "popup__input-error_hidden"
          }`}
        >
          {errors.name}
        </span>
      </div>
      <div className="popup__input-wrapper">
        <input
          name="link"
          id="popup__input-link"
          className={`popup__input popup__input_margin-large ${
            errors.link ? "popup__input_type_error" : ""
          }`}
          type="url"
          placeholder="Link da imagem"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span
          id="popup__input-link-error"
          className={`popup__input-error popup__input-error_positioned-top ${
            errors.link ? "" : "popup__input-error_hidden"
          }`}
        >
          {errors.link}
        </span>
      </div>
      <button
        id="popup__save-add-button"
        type="submit"
        className={`popup__save-button ${
          !isFormValid || saving ? "popup__save-button_disabled" : ""
        }`}
        disabled={!isFormValid || saving}
      >
        {saving ? "Salvando..." : "Criar"}
      </button>
    </form>
  );
}
