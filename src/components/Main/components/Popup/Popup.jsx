import closeIcon from "../../../../images/close__icon.svg";

import { useEffect } from "react";

export default function Popup(props) {
  const { onClose, title, children } = props;

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        if (document.activeElement) {
          document.activeElement.blur();
        }
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("popup")) {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div
        className={`popup__card ${
          !title ? "popup__card_type_image" : "popup__card_type_forms"
        }`}
      >
        <button
          className="popup__close-button"
          aria-label="Close modal"
          type="button"
          onClick={onClose}
        >
          <img
            className="popup__close-button-icon"
            src={closeIcon}
            alt="Ícone de Fechar"
          />
        </button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
