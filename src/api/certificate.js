import api from '../axios/api';

//전공 불러오는 api
const majorGet = async () => {
  try {
    const response = await api.get(`/api/major`);
    return response.data;
  } catch (e) {
    // console.log(e.response.errMsg);
  }
};

//자격증 불러오는 api
const certificateGet = async () => {
  try {
    const response = await api.get(`/api/certificate`);
    return response.data;
  } catch (e) {
    // console.log(e.response.errMsg);
  }
};

//과목 불러오는 api
const subjectGet = async () => {
  try {
    const response = await api.get(`/api/subject`);
    return response.data;
  } catch (e) {
    // console.log(e.response.errMsg);
  }
};

export { majorGet, certificateGet, subjectGet };
