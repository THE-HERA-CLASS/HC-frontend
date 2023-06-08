import { useMutation, useQuery } from 'react-query';
import { getExamIdPost, questionFilePost } from '../../../api/posts';
import { useState } from 'react';
import CustomBtn from '../../common/CustomBtn';
import CustomText from '../../common/CustomText';
import { styled } from 'styled-components';
import { majorGet, matchingCertGet, matchingSubGet } from '../../../api/certificate';

const Modal = ({ setModal }) => {
  // select태그 관리
  const [select, setSelect] = useState({
    major_id: '',
    certificate_id: '',
    subject_id: '',
    year: '',
    round: '',
    exam_id: '',
  });

  // 전공 불러오기
  const { data: majorData } = useQuery('major', majorGet);

  // 자격증 불러오기
  const { data: certificateData } = useQuery(
    ['certificate', select.major_id], // 쿼리 키에 select.major_id를 추가하여 전공 선택 시마다 쿼리를 재실행
    () => matchingCertGet(select.major_id),
    {
      enabled: select.major_id !== '', // select.major_id 값이 비어있지 않을 때에만 쿼리를 실행
    },
  );

  // 과목 불러오기
  const { data: subjectData } = useQuery(
    ['matchingSub', select.certificate_id], // 쿼리 키에 select.certificate_id를 추가하여 전공 선택 시마다 쿼리를 재실행
    () => matchingSubGet(select.certificate_id),
    {
      enabled: select.certificate_id !== '', // select.certificate_id 값이 비어있지 않을 때에만 쿼리를 실행
    },
  );
  const selectChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelect((prevSelect) => ({
      ...prevSelect,
      [name]: value,
    }));
  };
  const [files, setFiles] = useState(null);

  const ChangeFileHandler = (e) => {
    setFiles(e.target.files[0]);
  };

  //ExamId 불러오는 함수
  const getExamIdMutation = useMutation(getExamIdPost, {
    onSuccess: (data) => {
      if (data?.exam_id) {
        setSelect((prevSelect) => ({
          ...prevSelect,
          exam_id: data.exam_id,
        }));
      }
    },
  });

  const FindExamIdHandler = () => {
    const formData = new FormData();
    formData.append('major_id', parseInt(select.major_id));
    formData.append('certificate_id', parseInt(select.certificate_id));
    formData.append('subject_id', parseInt(select.subject_id));
    formData.append('year', parseInt(select.year));
    formData.append('round', parseInt(select.round));
    console.log(formData);
    getExamIdMutation.mutate(formData);
  };

  // 시험문제 파싱
  const parsingMutation = useMutation(questionFilePost, {
    onSuccess: () => {
      setModal(false);
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', files);
    formData.append('exam_id', parseInt(select.exam_id));
    console.log(formData);

    parsingMutation.mutate(formData);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Background>
        <ModalLayout>
          <SelectBox name='major_id' value={select.major_id} onChange={selectChangeHandler}>
            <option value='' disabled hidden>
              전공
            </option>
            {majorData?.map((major) => {
              return (
                <option key={major.major_id} value={major.major_id}>
                  {major.name}
                </option>
              );
            })}
          </SelectBox>

          <SelectBox name='certificate_id' value={select.certificate_id} onChange={selectChangeHandler}>
            <option value='' disabled hidden>
              자격증
            </option>
            {certificateData?.map((certificate) => {
              return (
                <option key={certificate.certificate_id} value={certificate.certificate_id}>
                  {certificate.name}
                </option>
              );
            })}
          </SelectBox>

          <SelectBox name='subject_id' value={select.subject_id} onChange={selectChangeHandler}>
            <option value='' disabled hidden>
              과목
            </option>
            {subjectData?.map((subject) => {
              return (
                <option key={subject.subject_id} value={subject.subject_id}>
                  {subject.name}
                </option>
              );
            })}
          </SelectBox>

          <div>
            <CustomText>년도: ex - 2022{''}</CustomText>
            <input type='number' name='year' value={select.year} onChange={selectChangeHandler} />
          </div>
          <div>
            <CustomText>회차: ex - 1{''}</CustomText>
            <input type='number' name='round' value={select.round} onChange={selectChangeHandler} />
          </div>

          <input type='file' onChange={ChangeFileHandler} />
          <input type='number' name='exam_id' placeholder='examId를 입력해주세요.' onChange={selectChangeHandler} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <CustomBtn
              type='button'
              width='100px'
              height='35px'
              _borderradius='10px'
              bc='#282897'
              onClick={FindExamIdHandler}>
              <CustomText fontSize='1rem' fontWeight='700' color='#fff'>
                examId검색
              </CustomText>
            </CustomBtn>
            <CustomBtn type='submit' width='100px' height='35px' _borderradius='10px' bc='#282897'>
              <CustomText fontSize='1rem' fontWeight='700' color='#fff'>
                등록
              </CustomText>
            </CustomBtn>
          </div>
        </ModalLayout>
      </Background>
    </form>
  );
};

const ModalLayout = styled.div`
  position: absolute;
  top: 30%;
  left: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;

  width: 500px;
  height: 500px;
  background: #fff;
  border-radius: 10px;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
`;

const SelectBox = styled.select`
  width: 200px;
  height: 30px;
  text-align: center;
`;
export default Modal;
