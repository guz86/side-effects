import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Login.module.css';
import _ from 'lodash';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);

  const [formatIsValid, setFormatIsValid] = useState(false);

  const handleEmailChange = _.debounce((value: string) => {
    console.log('handleEmailChange');
    setEmail(value);
    setFormatIsValid(value.trim().includes('@') && password.trim().length > 5);
  }, 1000);

  const handlePasswordChange = _.debounce((value: string) => {
    console.log('handlePasswordChange');
    setPassword(value);
    setFormatIsValid(email.trim().includes('@') && value.trim().length > 5);
  }, 1000);

  //   useEffect(() => {
  //     setFormatIsValid(email.trim().includes('@') && password.trim().length > 5);
  //   }, [email, password]);

  function emailChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    handleEmailChange(event.target.value);
    // setEmail(event.target.value);
    // setFormatIsValid(
    //   event.target.value.trim().includes('@') && password.trim().length > 5
    // );
  }

  function passwordChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    handlePasswordChange(event.target.value);
    // setPassword(event.target.value);
    // setFormatIsValid(
    //   email.trim().includes('@') && event.target.value.trim().length > 5
    // );
  }

  const validateEmailHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setEmail(value);
    setEmailIsValid(value.includes('@'));
  };

  const validatePasswordHandler = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value.trim();
    setPassword(value);
    setPasswordIsValid(value.length > 5);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Form submitted');
  };

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
