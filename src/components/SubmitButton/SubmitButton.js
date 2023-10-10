import './SubmitButton.css';

function SubmitButton({ text, label, isValid }) {
  return (
    <button
      className={`submit-btn ${isValid ? "hover-opacity-btn" : "submit-btn_disabled"}`}
      type="submit"
      name="submit-btn"
      aria-label={label}
      disabled={!isValid}>
        {text}
      </button>
  )
}

export default SubmitButton;