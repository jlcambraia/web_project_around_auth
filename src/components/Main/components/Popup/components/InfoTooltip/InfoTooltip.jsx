import successIcon from "../../../../../../images/infotooltip__success.svg";
import failedIcon from "../../../../../../images/infotooltip__failed.svg";

export default function InfoTooltip({ isRegistered }) {
  return (
    <div className="infotooltip__card">
      {isRegistered ? (
        <img
          className="infotooltip__image"
          src={successIcon}
          alt="Ícone de sucesso no registro"
        />
      ) : (
        <img
          className="infotooltip__image"
          src={failedIcon}
          alt="Ícone de falha no registro"
        />
      )}

      <h2 className="infotooltip__title">
        {isRegistered
          ? "Vitória! Você foi registrado com sucesso."
          : "Ops, algo deu errado! Por favor, tente novamente."}
      </h2>
    </div>
  );
}
