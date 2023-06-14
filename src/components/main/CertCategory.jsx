import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CustomText from '../common/CustomText';
import { useQuery } from 'react-query';
import { majorGet, matchingCertGet } from '../../api/certificate';
import { useNavigate } from 'react-router-dom';

function CertCategory() {
  const navigate = useNavigate();

  //전공 카테고리 상태관리
  const [selectedMajorId, setSelectedMajorId] = useState('');

  //전공 가져오기
  const { data: majorData } = useQuery('major', majorGet);

  //전공에 따른 자격증 가져오기
  const { data: certificateData } = useQuery(
    ['matchingCertGet', selectedMajorId],
    () => matchingCertGet(selectedMajorId),
    {
      enabled: selectedMajorId !== '',
      //5분 동안 캐싱처리
      cacheTime: 300 * 1000,
    },
  );

  //최초 렌더링 시에 전공 제일 앞 카테고리를 스테이트로 지정
  useEffect(() => {
    if (majorData?.length > 0) {
      setSelectedMajorId(majorData[0].major_id);
    }
  }, [majorData]);

  //전공 카테고리 선택
  const onClickHandler = (majorId) => {
    setSelectedMajorId(majorId);
  };

  const onCertClick = (certificateId) => {
    navigate(`/test-list/${certificateId}`);
  };
  return (
    <CatContainer>
      <MajorCat>
        {majorData?.map((major) => (
          <MajorCatItemBox
            key={major.major_id}
            isclick={selectedMajorId === major.major_id ? 'true' : 'false'}
            onClick={() => onClickHandler(major.major_id)}>
            <CustomText value={major.major_id} fontSize='1.55rem' fontweight='500'>
              {major.name}
            </CustomText>
          </MajorCatItemBox>
        ))}
      </MajorCat>
      <CertCat>
        {certificateData?.map((cert) => (
          <CustomText
            key={cert.certificate_id}
            fontSize='1.5rem'
            fontweight='500'
            color='#898989'
            cursor='pointer'
            onClick={() => onCertClick(cert.certificate_id)}>
            {cert.name}
          </CustomText>
        ))}
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
  padding: 0px 110px;
  border-radius: 10px;
  background: #d2e6ff;
  display: flex;
  flex-wrap: wrap;

  > * {
    flex: 0 0 25%;
  }
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
  color: ${({ isclick }) => (isclick === 'true' ? '#282897' : '#898989')};
  border-bottom: ${({ isclick }) => (isclick === 'true' ? '5px solid #282897' : '')};
  transition: border-bottom-color 0.3s ease-in-out;
`;

export default CertCategory;
