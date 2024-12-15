import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);

  const [formatIsValid, setFormatIsValid] = useState(false);

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Form submitted');
  };

  function emailChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
    setFormatIsValid(email.trim().includes('@') && password.trim().length > 5);
  }

  function passwordChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
    setFormatIsValid(email.trim().includes('@') && password.trim().length > 5);
  }

  function validateEmailHandler() {
    setEmailIsValid(email.trim().includes('@'));
  }

  function validatePasswordHandler() {
    setPasswordIsValid(password.trim().length > 5);
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={`${styles.div} ${!emailIsValid ? styles.invalid : ''}`}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          required
        />
      </div>
      <div
        className={`${styles.div} ${!passwordIsValid ? styles.invalid : ''}`}
      >
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          required
        />
      </div>
      <button type="submit" disabled={!formatIsValid} className={styles.button}>
        Login
      </button>
    </form>
  );
};
