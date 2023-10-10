import './InputForm.css';

function InputForm({ inputLabel, type, name, id, minLength, maxLength, placeholder, onChange, value, error, errorClassName }) {
  return (
    <>
      <label className="input__label" htmlFor={id}>
          {inputLabel}
      </label>
      <div className="input-wrapper">
        <input
            className={`input ${error ? errorClassName : ""}`}
            type={type}
            name={name}
            id={id}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required/>
      </div>
      <span className="input__error">{error}</span>
    </>
  )
}

export default InputForm;