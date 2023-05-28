import React from 'react';
import { styled } from 'styled-components';
import CustomText from '../common/CustomText';

function Header() {
  return (
    <Container>
      <LogoBox>
        <CustomText>Hera Class</CustomText>
      </LogoBox>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 28px 72px;
  gap: 1046px;

  position: relative;
  width: 1920px;
  height: 100px;

  border: 1px solid #486284;
`;

const LogoBox = styled.div`
  width: 147px;
  height: 44px;

  display: flex;
  align-items: center;
  letter-spacing: -0.03em;
`;
export default Header;
