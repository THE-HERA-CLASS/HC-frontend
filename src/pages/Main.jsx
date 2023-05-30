import React from 'react';
import { Layout } from '../components/common/styled/Layout';
import { styled } from 'styled-components';
import CustomText from '../components/common/CustomText';
import CustomBtn from '../components/common/CustomBtn';

function Main() {
  return (
    <Layout>
      <TopBox>
        <ExplainBox>
          <TextContainer>
            <CustomText fontSize='35px' fontWeight='700' fontFamily='Inter'>
              맞춤형 자격증 준비 서비스
            </CustomText>
            <CustomText fontSize='30px' fontWeight='600' fontFamily='Inter' margin='0 0 29px 0'>
              로그인하고 이용해보세요!
            </CustomText>
            <ButtonBox>
              <CustomBtn width='180px' height='54px' border='3px solid #486284' borderRadius='30px' bc='#D3DCE7'>
                회원가입
              </CustomBtn>
              <CustomBtn width='180px' height='54px' border='3px solid #486284' borderRadius='30px' bc='#D3DCE7'>
                로그인
              </CustomBtn>
            </ButtonBox>
          </TextContainer>
          <ImgBox></ImgBox>
        </ExplainBox>
        <TestSearchBox></TestSearchBox>
      </TopBox>
    </Layout>
  );
}

const TopBox = styled.div`
  margin-bottom: 142px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 1200px;
  height: 598px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #d3dce7;
`;

const ExplainBox = styled.div`
  width: 1200px;
  height: 404px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 164px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 50px;
`;
const ImgBox = styled.div`
  width: 404px;
  height: 360px;
  background: saddlebrown;
`;
const TestSearchBox = styled.div`
  width: 1200px;
  height: 194px;
  border-radius: 10px;
  background: #eff3fd;
`;
export default Main;
