import { styles } from "../public/js/styles";

export default function Input({
  name,
  value,
  placeholder,
  type,
  disabled,
  handleChange
}) {
  return (
    <>
      <div className="inputContainer">
        <input
          className="input"
          placeholder={placeholder}
          value={value}
          type={type}
          name={name}
          autoComplete="off"
          onChange={(e) => {
            handleChange(e);
          }}
          disabled={disabled}
        />

        {value && (
          <label className="label" for={placeholder}>
            {placeholder}
          </label>
        )}
      </div>

      <style jsx>{`
        .inputContainer {
          position: relative;
          margin: 0.6rem 0;
        }
        .input {
          width: 100%;
          border: 1px solid gray;
          border-radius: 0.5rem;
          padding: 0.6rem 0.8rem;
          color: #555;
          font-size: 1rem;
        }

        .input:focus {
          border: 1px solid ${styles.primaryColor};
          -webkit-box-shadow: 0px 0px 5px lightgrey;
          box-shadow: 0px 0px 5px lightgrey;
        }

        .input::-webkit-input-placeholder {
          color: lightgrey;
        }
        .input::-moz-placeholder {
          color: lightgrey;
        }
        .input:-ms-input-placeholder {
          color: lightgrey;
        }
        .input::-ms-input-placeholder {
          color: lightgrey;
        }
        .input::placeholder {
          color: lightgrey;
        }
        .label {
          width: -webkit-fit-content;
          width: -moz-fit-content;
          width: fit-content;
          font-size: 0.8rem;
          position: absolute;
          bottom: 0.6rem;
          right: 0.8rem;
          padding: 0;
          pointer-events: none;
          color: grey;
          background: white;
          -webkit-transform: translateY(-1.4rem);
          -ms-transform: translateY(-1.4rem);
          transform: translateY(-1.4rem);
          opacity: ${disabled === true && "0"};
          -webkit-transition: all 0.8s ease;
          -o-transition: all 0.8s ease;
          transition: all 0.8s ease;
        }
      `}</style>
    </>
  );
}
