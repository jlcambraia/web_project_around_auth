export default function ImagePopup(props) {
  const { card } = props;

  return (
    <>
      <img className="popup__image" src={card.link} alt="" />
      <p className="popup__caption">{card.name}</p>
    </>
  );
}
