import React from 'react';
import { styled } from 'styled-components';
import CustomText from '../common/CustomText';
import CustomBtn from '../common/CustomBtn';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { LogoutDelete } from '../../api/users';

function Header() {
  const cookie = Cookies.get('accessToken');
  const userInfo = localStorage.getItem('userInfo');
  const userAuth = JSON.parse(userInfo)?.authority;
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const goSignup = () => {
    navigate('/signups');
  };

  const goLogin = () => {
    navigate('/logins');
  };

  const goUserMyPage = () => {
    navigate('/usermypages');
  };

  const goAdmin = () => {
    navigate('/adminpages');
  };

  const goTestList = () => {
    navigate('/test-list');
  };

  const LogoutMutation = useMutation(LogoutDelete, {
    onSuccess: () => {
      Cookies.remove('accessToken');
      localStorage.removeItem('userInfo');
      goHome();
    },
  });
  const LogoutHandler = () => {
    LogoutMutation.mutate();
  };
  return (
    <Container>
      <Title>
        <CustomText
          fontSize='32px'
          fontWeight='600'
          fontFamily='Inter'
          color=' #1A202C'
          cursor='pointer'
          onClick={goHome}>
          Hera Class
        </CustomText>
      </Title>

      <MenuWrap>
        <CustomText
          fontSize='15px'
          fontWeight='600'
          fontFamily='Roboto'
          color='#1A202C'
          cursor='pointer'
          onClick={goHome}>
          홈
        </CustomText>

        <CustomText
          fontSize='15px'
          fontWeight='600'
          fontFamily='Plus Jakarta Sans'
          color='#1A202C'
          cursor='pointer'
          onClick={goTestList}>
          기출문제
        </CustomText>

        <CustomText fontSize='15px' fontWeight='600' fontFamily='Plus Jakarta Sans' color='#1A202C' cursor='pointer'>
          실전연습
        </CustomText>

        {userAuth === 'C' ? (
          <CustomText
            fontSize='15px'
            fontWeight='600'
            fontFamily='Plus Jakarta Sans'
            color='#1A202C'
            cursor='pointer'
            onClick={goUserMyPage}>
            마이페이지
          </CustomText>
        ) : null}

        {userAuth === 'C' ? null : (
          <CustomText
            fontSize='15px'
            fontWeight='600'
            fontFamily='Plus Jakarta Sans'
            color='#1A202C'
            cursor='pointer'
            onClick={goAdmin}>
            문제관리
          </CustomText>
        )}

        <Divider />

        <CustomText
          fontSize='15px'
          fontWeight='600'
          fontFamily='Inter'
          color='#282897'
          textDecoration='underline'
          opacity='0.75'
          cursor='pointer'
          onClick={goSignup}>
          회원가입
        </CustomText>

        {cookie ? (
          <CustomBtn width='82px' height='38px' bc='#282897' _borderradius='4px'>
            <CustomText fontSize='15px' fontWeight='500' fontFamily='Inter' color='#fff' onClick={LogoutHandler}>
              로그아웃
            </CustomText>
          </CustomBtn>
        ) : (
          <CustomBtn width='82px' height='38px' bc='#282897' _borderradius='4px'>
            <CustomText fontSize='15px' fontWeight='500' fontFamily='Inter' color='#fff' onClick={goLogin}>
              로그인
            </CustomText>
          </CustomBtn>
        )}
      </MenuWrap>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100px;
  padding: 28px 72px;

  border: 1px solid #486284;
  box-sizing: border-box;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  letter-spacing: -0.03em;
`;

const MenuWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  letter-spacing: -0.03em;

  gap: 25px;
`;

const Divider = styled.div`
  height: 21px;
  border-left: 1px solid #486284;
  opacity: 0.8;
`;
export default Header;
