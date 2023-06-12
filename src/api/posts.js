import api from '../axios/api';

const questionFilePost = async (formData) => {
  try {
    const response = await api.post(`/api/question_file`, formData);
    console.log(response?.data?.data);
    if (response.status === 200) {
      alert('문제가 등록되었습니다 ');
    }
  } catch (e) {
    if (e.response.status === 400) {
      alert(`문제 등록에 실패하였습니다.`);
    } else if (e.response.status === 411) {
      alert(`파일을 지정해주세요`);
    }
  }
};

const getExamIdPost = async (formData) => {
  try {
    const response = await api.post(`/api/exam/getExamId`, formData);
    if (response.status === 200) {
      alert(`요청하신 Id는 ${response.data.exam_id} 입니다`);
    }
  } catch (e) {
    if (e.response.status === 400) {
      alert(e.response.data.errMsg);
    } else if (e.response.status === 411) {
      alert(e.response.data.errMsg);
    } else {
      alert(e.response.data.errMsg);
    }
  }
};
export { questionFilePost, getExamIdPost };
