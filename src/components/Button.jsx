import "../sass/Button.scss";
function Button({ icon, handleClick }) {

  return (
    <div className="button">
      <button className="button__btn" onClick={handleClick}>
        {icon}
      </button>
      <div className="button__shadow"></div>
    </div>
  );
}

export { Button };
