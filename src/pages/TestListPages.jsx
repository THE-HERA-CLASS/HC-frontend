import React from 'react';
import { styled } from 'styled-components';
import CustomText from '../components/common/CustomText';
import CustomBtn from '../components/common/CustomBtn';
import { useQuery } from 'react-query';
import { examAllGet } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';

function TestListPages() {
  const navigate = useNavigate();

  // 메인페이지 카테고리에서 원하는 자격증 클릭 시 certificateId로 해당 자격증에 맞는 시험 과목 로드를 위한 파람즈
  const { certificateId } = useParams();

  const { data: exams } = useQuery(['examallget', certificateId], () => examAllGet(certificateId), {
    // 자격증 ID가 있을 경우에만 가져옴
    enabled: certificateId ? true : false,
    // 5분 동안 캐싱 처리
    cacheTime: 300 * 1000,
  });
  const { data: allExams } = useQuery('examallget', examAllGet, {
    enabled: certificateId === undefined, // 자격증 ID가 전달되지 않은 경우에만 실행
    cacheTime: 300 * 1000, // 5분 동안 캐싱 처리
  });

  const goTestPage = (examId) => {
    navigate(`/testpages/exam/${examId}`);
  };
  return (
    <TestListLayout>
      <ListContainer>
        <ListBox>
          <ListBoxHeader>
            <HeaderItem>
              <CustomText fontSize='1.25rem' fontWeight='700'>
                과목명
              </CustomText>
            </HeaderItem>

            <HeaderItem>
              <CustomText fontSize='1.25rem' fontWeight='700'>
                년도
              </CustomText>
            </HeaderItem>

            <HeaderItem>
              <CustomText fontSize='1.25rem' fontWeight='700'>
                회차
              </CustomText>
            </HeaderItem>

            <HeaderItem>
              <CustomText fontSize='1.25rem' fontWeight='700'>
                {/* 줄맞추기 위한 빈 태그 */}
              </CustomText>
            </HeaderItem>
          </ListBoxHeader>

          {exams?.map((exam) => {
            return (
              <TestList key={exam.exam_id}>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.subject_name}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.year}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.round}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomBtn
                    width='90px'
                    height='31px'
                    bc='#282897'
                    _borderradius='5px'
                    onClick={() => goTestPage(exam.exam_id)}>
                    <CustomText fontSize='1rem' color='#fff'>
                      응시하기
                    </CustomText>
                  </CustomBtn>
                </ListItem>
              </TestList>
            );
          })}
          {allExams?.map((exam) => {
            return (
              <TestList key={exam.exam_id}>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.subject_name}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.year}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomText fontSize='1.25rem'>{exam.round}</CustomText>
                </ListItem>
                <ListItem>
                  <CustomBtn
                    width='90px'
                    height='31px'
                    bc='#282897'
                    _borderradius='5px'
                    onClick={() => goTestPage(exam.exam_id)}>
                    <CustomText fontSize='1rem' color='#fff'>
                      응시하기
                    </CustomText>
                  </CustomBtn>
                </ListItem>
              </TestList>
            );
          })}
        </ListBox>
      </ListContainer>
    </TestListLayout>
  );
}

const TestListLayout = styled.div`
  margin: 70px 153px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListBox = styled.div`
  width: 1200px;
  flex-direction: column;
`;

const ListBoxHeader = styled.div`
  width: 100%;
  background: #d2e6ff;
  height: 48px;
  padding: 0px 70px;
  display: flex;
  align-items: center;
`;

const HeaderItem = styled.div`
  flex-basis: 25%;
`;

const TestList = styled.div`
  width: 100%;
  height: 48px;
  padding: 0px 70px;
  display: flex;
  align-items: center;
`;

const ListItem = styled.div`
  flex-basis: 25%;
`;

export default TestListPages;
