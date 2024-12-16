import styles from './Input.module.css';

interface InputState {
  value: string;
  touched: boolean;
  isValid: boolean;
}

interface InputProps {
  state: InputState;
  id: string;
  label: string;
  type: string;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateInputHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  state,
  id,
  label,
  type,
  inputChangeHandler,
  validateInputHandler,
}) => {
  return (
    <div
      className={`${styles.div} ${state.touched && !state.isValid ? styles.invalid : ''}`}
    >
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className={styles.input}
        value={state.value}
        onChange={inputChangeHandler}
        onBlur={validateInputHandler}
        required
      />
    </div>
  );
};
