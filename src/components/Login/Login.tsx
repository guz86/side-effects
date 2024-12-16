import { ChangeEvent, FormEvent, useReducer, useCallback } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

interface FieldState {
  value: string;
  isValid: boolean;
  touched: boolean;
}

type FieldAction =
  | { type: 'USER_INPUT'; value: string }
  | { type: 'INPUT_BLUR' }
  | { type: 'RESET' };

const emailReducer = (
  prevState: FieldState,
  action: FieldAction
): FieldState => {
  switch (action.type) {
    case 'USER_INPUT':
      return {
        ...prevState,
        value: action.value,
        isValid: action.value.includes('@'),
      };
    case 'INPUT_BLUR':
      return {
        ...prevState,
        touched: true,
        isValid: prevState.value.includes('@'),
      };
    case 'RESET':
      return { value: '', isValid: false, touched: false };
    default:
      return prevState;
  }
};

const passwordReducer = (
  prevState: FieldState,
  action: FieldAction
): FieldState => {
  switch (action.type) {
    case 'USER_INPUT':
      return {
        ...prevState,
        value: action.value,
        isValid: action.value.trim().length > 5,
      };
    case 'INPUT_BLUR':
      return {
        ...prevState,
        touched: true,
        isValid: prevState.value.trim().length > 5,
      };
    case 'RESET':
      return { value: '', isValid: false, touched: false };
    default:
      return prevState;
  }
};

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: '',
    isValid: false,
    touched: false,
  });

  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
    value: '',
    isValid: false,
    touched: false,
  });

  const formIsValid = emailState.isValid && passwordState.isValid;

  const emailChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      dispatchEmailState({ type: 'USER_INPUT', value });
    },
    []
  );

  const passwordChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      dispatchPasswordState({ type: 'USER_INPUT', value });
    },
    []
  );

  const validateEmailHandler = () => {
    dispatchEmailState({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Form submitted', {
      email: emailState.value,
      password: passwordState.value,
    });
    login();
    navigate('/');
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div
        className={`${styles.div} ${
          emailState.touched && !emailState.isValid ? styles.invalid : ''
        }`}
      >
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          required
        />
      </div>
      <div
        className={`${styles.div} ${
          passwordState.touched && !passwordState.isValid ? styles.invalid : ''
        }`}
      >
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={passwordState.value}
          className={styles.input}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          required
        />
      </div>
      <button type="submit" disabled={!formIsValid} className={styles.button}>
        Login
      </button>
    </form>
  );
};
