import React, { useState } from 'react';

function Login() {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  const userInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <input type='text' name='email' value={userInput.email} onChange={userInputChangeHandler} />
      <input type='password' name='password' value={userInput.password} onChange={userInputChangeHandler} />
      <button type='submit'>로그인</button>
    </form>
  );
}

export default Login;
