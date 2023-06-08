import React, { useState } from 'react';
import { styled } from 'styled-components';
import CustomBtn from '../components/common/CustomBtn';
import CustomText from '../components/common/CustomText';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/adminpage/fileUpload/Modal';

function AdminPage() {
  const navigate = useNavigate();

  //모달 스테이트
  const [modal, setModal] = useState(false);

  //클릭 시 파싱에디터로 보내기
  const goParsingEditor = () => {
    navigate('/parsingeditor');
  };

  const modalHandler = () => {
    setModal(true);
  };
  return (
    <AdminLayout>
      <CustomBtn width='500px' height='200px' _borderradius='10px' bc='#282897' onClick={goParsingEditor}>
        <CustomText fontSize='2.5rem' fontWeight='700' color='#fff'>
          에디터로 등록
        </CustomText>
      </CustomBtn>
      <CustomBtn width='500px' height='200px' _borderradius='10px' bc='#282897' onClick={modalHandler}>
        <CustomText fontSize='2.5rem' fontWeight='700' color='#fff'>
          파일로 등록
        </CustomText>
      </CustomBtn>
      {modal ? <Modal setModal={setModal} /> : null}
    </AdminLayout>
  );
}

//어드민 페이지
const AdminLayout = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 50px;
`;
export default AdminPage;
