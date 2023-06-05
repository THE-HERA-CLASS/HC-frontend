import React, { useState } from 'react';
import { styled } from 'styled-components';
import CustomBtn from '../../common/CustomBtn';
import { certificateGet, majorGet, subjectGet } from '../../../api/certificate';
import { useQuery } from 'react-query';
import SearchIcon from '../../../Img/MainPage/search.svg';

function Search() {
  // 전공 불러오기
  const { data: majorData } = useQuery('major', majorGet);

  // 자격증 불러오기
  const { data: certificateData } = useQuery('certificate', certificateGet);

  // 과목 불러오기
  const { data: subjectData } = useQuery('subject', subjectGet);

  // select태그 관리
  const [select, setSelect] = useState({
    major_id: '',
    certificate_id: '',
    subject_id: '',
  });

  const selectChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelect({
      ...select,
      [name]: value,
    });
  };
  return (
    <SelectBox>
      <Select name='major_id' value={select.major_id} onChange={selectChangeHandler}>
        <option value='' disabled hidden>
          전공
        </option>
        {majorData?.map((major) => {
          return (
            <option key={major.major_id} value={major.major_id} onClick={selectChangeHandler}>
              {major.name}
            </option>
          );
        })}
      </Select>

      <Divider />

      <Select name='certificate_id' value={select.certificate_id} onChange={selectChangeHandler}>
        <option value='' disabled hidden>
          자격증
        </option>
        {certificateData?.map((certificate) => {
          return (
            <option key={certificate.certificate_id} value={certificate.certificate_id} onClick={selectChangeHandler}>
              {certificate.name}
            </option>
          );
        })}
      </Select>

      <Divider />

      <Select name='subject_id' value={select.subject_id} onChange={selectChangeHandler}>
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
      </Select>

      <CustomBtn width='116px' height='74px' _borderradius='0 10px 10px 0' bc='#282897'>
        <img src={SearchIcon} alt='' />
      </CustomBtn>
    </SelectBox>
  );
}
const SelectBox = styled.div`
  width: 788px;
  height: 72px;
  border: 1px solid #454545;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  border-radius: 10px;

  gap: 30px;
`;

const Select = styled.select`
  padding-right: 20px;
  border: none;
  width: 170px;
  height: 72px;
  background-color: transparent;

  font-size: 20px;
  font-weight: 400;

  text-align: right;

  option {
    background: #aab5c3;
  }
`;

const Divider = styled.div`
  height: 40px;
  border-left: 1px solid #000000;
  opacity: 0.8;
`;
export default Search;
