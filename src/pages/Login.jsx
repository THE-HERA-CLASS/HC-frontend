import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { loginPost } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import CustomText from '../components/common/CustomText';
import CustomBtn from '../components/common/CustomBtn';
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
          <CustomText margin='0 0 49px 0' fontSize='2rem' fontWeight='700' color='#486284'>
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

          <FindIdBox>
            <CustomText fontSize='0.95rem' fontWeight='500' color=' #486284' textDecoration='underline'>
              아이디 찾기
            </CustomText>
            <CustomText fontSize='0.95rem' fontWeight='500' color=' #486284' textDecoration='underline'>
              비밀번호 찾기
            </CustomText>
          </FindIdBox>

          <CustomBtn type='submit' width='384px' height='66px' _borderradius='10px' bc='#486284'>
            <CustomText fontSize='1.5rem' fontWeight='700' color='#fff'>
              Login
            </CustomText>
          </CustomBtn>

          <GoSingupBox>
            <CustomText fontSize='0.95rem' fontWeight='500' color=' #486284'>
              아직 회원이 아니신가요?
            </CustomText>
            <CustomText fontSize='1.2rem' fontWeight='500' color=' #486284' textDecoration='underline'>
              회원가입
            </CustomText>
          </GoSingupBox>
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

  padding-top: 80px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: start;

  background: #fff;

  border-radius: 10px;
`;

const LoginInput = styled.input`
  width: 384px;
  height: 60px;

  background: #d3dce7;

  border-radius: 10px;

  border: none;

  margin: 15px;

  padding-left: 24px;

  font-size: 1.2rem;

  &::placeholder {
    font-size: 20px;
    color: #486284;
  }
`;

const FindIdBox = styled.div`
  width: 384px;

  margin-bottom: 49px;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: end;

  gap: 24px;
`;

const GoSingupBox = styled.div`
  width: 384px;

  margin-top: 13px;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  gap: 14px;
`;
export default Login;
