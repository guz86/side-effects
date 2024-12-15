import { FormEvent, useState } from 'react';
import styles from './Login.module.css';

export const Login = () => {
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.div}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          required
        />
      </div>
      <div className={styles.div}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};
