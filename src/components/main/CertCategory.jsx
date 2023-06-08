import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CustomText from '../common/CustomText';

function CertCategory() {
  const [isClick1, setIsClick1] = useState(false);
  const [isClick2, setIsClick2] = useState(false);
  const [isClick3, setIsClick3] = useState(false);
  const [isClick4, setIsClick4] = useState(false);

  useEffect(() => {
    setIsClick1(true);
  }, []);

  const onClickMajor1 = () => {
    setIsClick1((prev) => !prev);
    setIsClick2(false);
    setIsClick3(false);
    setIsClick4(false);
  };
  const onClickMajor2 = () => {
    setIsClick2((prev) => !prev);
    setIsClick1(false);
    setIsClick3(false);
    setIsClick4(false);
  };
  const onClickMajor3 = () => {
    setIsClick3((prev) => !prev);
    setIsClick1(false);
    setIsClick2(false);
    setIsClick4(false);
  };
  const onClickMajor4 = () => {
    setIsClick4((prev) => !prev);
    setIsClick1(false);
    setIsClick2(false);
    setIsClick3(false);
  };
  return (
    <CatContainer>
      <MajorCat>
        <MajorCatItemBox isclick={isClick1 ? 'true' : 'false'} onClick={onClickMajor1}>
          <CustomText fontSize='1.55rem' fontweight='500'>
            컴퓨터 공학
          </CustomText>
        </MajorCatItemBox>
        <MajorCatItemBox isclick={isClick2 ? 'true' : 'false'} onClick={onClickMajor2}>
          <CustomText fontSize='1.55rem' fontweight='500'>
            정보통신 공학
          </CustomText>
        </MajorCatItemBox>
        <MajorCatItemBox isclick={isClick3 ? 'true' : 'false'} onClick={onClickMajor3}>
          <CustomText fontSize='1.55rem' fontweight='500'>
            정보보호학
          </CustomText>
        </MajorCatItemBox>
        <MajorCatItemBox isclick={isClick4 ? 'true' : 'false'} onClick={onClickMajor4}>
          <CustomText fontSize='1.55rem' fontweight='500'>
            전자계산학
          </CustomText>
        </MajorCatItemBox>
      </MajorCat>
      <CertCat>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
        <CustomText fontSize='1.5rem' fontweight='500' color='#898989'>
          데이터 분석기사
        </CustomText>
      </CertCat>
    </CatContainer>
  );
}
const CatContainer = styled.div`
  height: 309px;

  background: #f8faff;
  margin-bottom: 142px;

  border-radius: 10px;

  display: flex;
  flex-direction: column;
`;

const MajorCat = styled.div`
  height: 60px;

  border-radius: 10px;

  background: #d2e6ff;
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-around;

  text-align: center;
`;

const CertCat = styled.div`
  height: 249px;

  padding-top: 40px;
  padding-left: 80px;

  display: flex;
  flex-wrap: wrap;

  > * {
    flex: 0 0 27%;
  }
`;

const MajorCatItemBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 50px;
  box-sizing: border-box;
  color: ${({ isclick }) => (isclick === 'true' ? '#282897' : ' #898989')};
  border-bottom: ${({ isclick }) => (isclick === 'true' ? '5px solid #282897' : '')};
`;

export default CertCategory;
