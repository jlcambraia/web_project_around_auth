export default function ErrorPopup(props) {
  const { error } = props;

  return (
    <>
      <p className="popup__message">{error}</p>
    </>
  );
}
