import React from 'react';
import { styled } from 'styled-components';
import CustomText from '../../common/CustomText';
import CustomBtn from '../../common/CustomBtn';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
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
        <CustomText fontSize='15px' fontWeight='600' fontFamily='Roboto' color='#1A202C' cursor='pointer'>
          홈
        </CustomText>
        <CustomText fontSize='15px' fontWeight='600' fontFamily='Plus Jakarta Sans' color='#1A202C' cursor='pointer'>
          기출문제
        </CustomText>
        <CustomText fontSize='15px' fontWeight='600' fontFamily='Plus Jakarta Sans' color='#1A202C' cursor='pointer'>
          실전연습
        </CustomText>
        <CustomText fontSize='15px' fontWeight='600' fontFamily='Plus Jakarta Sans' color='#1A202C' cursor='pointer'>
          문제관리
        </CustomText>
        <CustomText fontSize='15px' fontWeight='600' fontFamily='Plus Jakarta Sans' color='#1A202C' cursor='pointer'>
          마이페이지
        </CustomText>
        <Divider />
        <CustomText
          fontSize='15px'
          fontWeight='600'
          fontFamily='Inter'
          color='#486284'
          textDecoration='underline'
          opacity='0.75'
          cursor='pointer'>
          회원가입
        </CustomText>
        <CustomBtn width='82px' height='38px' bc=' #486284'>
          <CustomText fontSize='15px' fontWeight='500' fontFamily='Inter' color='#fff'>
            로그인
          </CustomText>
        </CustomBtn>
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
