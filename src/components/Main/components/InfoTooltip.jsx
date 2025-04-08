import closeIcon from "../../../images/close__icon.svg";
import successIcon from "../../../images/infotooltip__success.svg";
import failedIcon from "../../../images/infotooltip__failed.svg";

export default function InfoTooltip() {
  return (
    <div className="infotooltip">
      <div className="infotooltip__card">
        <button
          className="infotooltip__close-button"
          aria-label="Close modal"
          type="button"
        >
          <img
            className="infotooltip__close-button-icon"
            src={closeIcon}
            alt="Ícone de Fechar"
          />
        </button>
        <img className="infotooltip__image" src={successIcon} alt="" />
        <h2 className="infotooltip__title">
          Vitória! Você foi registrado com sucesso.
        </h2>
      </div>
    </div>
  );
}
