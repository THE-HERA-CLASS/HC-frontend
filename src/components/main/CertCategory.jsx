import React from 'react';
import { styled } from 'styled-components';
import CustomText from '../common/CustomText';

function CertCategory() {
  return (
    <CatContainer>
      <MajorCat>
        <CustomText fontSize='1.55rem' fontweight='500' color='#898989'>
          컴퓨터 공학
        </CustomText>
        <CustomText fontSize='1.55rem' fontweight='500' color='#898989'>
          정보통신 공학
        </CustomText>
        <CustomText fontSize='1.55rem' fontweight='500' color='#898989'>
          정보보호학
        </CustomText>
        <CustomText fontSize='1.55rem' fontweight='500' color='#898989'>
          전자계산학
        </CustomText>
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
  width: 100%;
  height: 309px;

  background: #eff3fd;
  margin-bottom: 142px;

  border-radius: 10px;

  display: flex;
  flex-direction: column;
`;

const MajorCat = styled.div`
  width: 100%;
  height: 60px;

  border-radius: 10px;

  background: #d3dce7;
  display: flex;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

  text-align: center;

  > * {
    flex: 0 0 25%;
  }
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

export default CertCategory;
