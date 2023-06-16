import api from '../axios/api';

//문제 파일로 업로드
const questionFilePost = async (formData) => {
  try {
    const response = await api.post(`/api/question_file`, formData);
    if (response.status === 200) {
      alert('문제가 등록되었습니다 ');
      return response;
    }
  } catch (e) {
    if (e.response.status === 400) {
      alert(`문제 등록에 실패하였습니다.`);
    } else if (e.response.status === 411) {
      alert(`파일을 지정해주세요`);
    }
  }
};

//시험지 ID 조회
const getExamIdPost = async (formData) => {
  try {
    const response = await api.post(`/api/exam/getExamId`, formData);
    if (response.status === 200) {
      alert(`요청하신 Id는 ${response.data.exam_id} 입니다`);
      return response.data;
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

//시험지 전체 조회
const examAllGet = async () => {
  try {
    const response = await api.get(`/api/exam`);
    return response.data.data;
  } catch (e) {
    if (e.response.status === 400) {
      alert(`알 수 없는 이유로 시험지 조회를 할 수 없습니다.`);
    } else {
      alert(`시험지 조회 실패`);
    }
  }
};
export { questionFilePost, getExamIdPost, examAllGet };
