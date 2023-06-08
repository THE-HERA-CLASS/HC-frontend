import api from '../axios/api';

//전공 불러오는 api
const majorGet = async () => {
  try {
    const response = await api.get(`/api/major`);
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};

//자격증 불러오는 api
const certificateGet = async () => {
  try {
    const response = await api.get(`/api/certificate`);
    return response.data.data;
  } catch (e) {
    console.log(e.response);
  }
};

//과목 불러오는 api
const subjectGet = async () => {
  try {
    const response = await api.get(`/api/subject`);
    return response.data.data;
  } catch (e) {
    console.log(e.response.errMsg);
  }
};

//전공에 따른 자격증 요청
const matchingCertGet = async (majorId) => {
  try {
    const response = await api.get(`/api/certificate/major/${majorId}`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (e) {
    if (e.response.status === 400) {
      throw new Error('전체 에러.');
    } else if (e.response.status === 411) {
      throw new Error('전공을 먼저 선택해주세요.');
    } else {
      throw new Error('조회에 실패 했습니다.');
    }
  }
};

//자격증에 따른 과목 요청
const matchingSubGet = async (certId) => {
  try {
    const response = await api.get(`/api/subject/certificate/${certId}`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (e) {
    if (e.response.status === 400) {
      throw new Error('전체 에러.');
    } else if (e.response.status === 411) {
      throw new Error('전공을 먼저 선택해주세요.');
    } else {
      throw new Error('조회에 실패 했습니다.');
    }
  }
};
export { majorGet, certificateGet, subjectGet, matchingCertGet, matchingSubGet };
