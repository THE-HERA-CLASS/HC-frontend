import api from '../axios/api';

//전공 불러오는 api
const majorGet = async () => {
  try {
    const response = await api.get(`/api/major`);
    console.log(response);
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

export { majorGet, certificateGet, subjectGet };
