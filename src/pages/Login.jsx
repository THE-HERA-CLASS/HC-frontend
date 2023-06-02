import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { loginPost } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import CustomText from '../components/common/CustomText';
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
      <LoginLayout>
        <LoginCard>
          <CustomText fontSize='2rem' fontWeight='700' color='#486284'>
            로그인
          </CustomText>
          <LoginInput
            type='text'
            name='email'
            value={userInput.email}
            onChange={userInputChangeHandler}
            placeholder='아이디'
            required
          />
          <LoginInput
            type='password'
            name='password'
            value={userInput.password}
            onChange={userInputChangeHandler}
            placeholder='비밀번호'
            required
          />
          <button type='submit'>로그인</button>
        </LoginCard>
      </LoginLayout>
    </form>
  );
}

const LoginLayout = styled.div`
  background: #d3dce7;

  padding: 70px 0;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;

const LoginCard = styled.div`
  width: 612px;
  height: 824px;

  margin: 80px 115px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  background: #fff;

  border-radius: 10px;
`;

const LoginInput = styled.input`
  width: 384px;
  height: 60px;

  background: #d3dce7;

  border-radius: 10px;

  border: none;
`;

export default Login;
