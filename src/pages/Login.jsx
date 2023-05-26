import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { loginPost } from '../api/users';
import { useNavigate } from 'react-router-dom';

function Login() {
  // 로그인 성공 시 홈으로 보내기
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  //로그인 인풋 관리
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

  // 요청 제출 로직
  const loginMutation = useMutation(loginPost);
  const submitHandler = (e) => {
    e.preventDefault();

    const user = {
      email: userInput.email,
      password: userInput.password,
    };

    loginMutation.mutate(user, goHome);
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        name='email'
        value={userInput.email}
        onChange={userInputChangeHandler}
        placeholder='아이디'
        required
      />
      <input
        type='password'
        name='password'
        value={userInput.password}
        onChange={userInputChangeHandler}
        placeholder='비밀번호'
        required
      />
      <button type='submit'>로그인</button>
    </form>
  );
}

export default Login;
