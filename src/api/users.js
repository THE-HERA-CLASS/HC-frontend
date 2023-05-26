import api from '../axios/api';

// 로그인
const loginPost = async (formData, goHome) => {
  try {
    const response = await api.post(`/api/login`, formData);
    if (response.status === 200) {
      const res = response.data;
      alert(`${res.nicname}님 로그인 되셨습니다.`);
      goHome();
    }
  } catch (e) {
    if (e.response.status === 404) {
      alert(`죄송합니다 서버와 통신에 있어 문제가 발생하였습니다.
      잠시 후 다시 이용해주세요.`);
    }
  }
};

// 회원가입
const signupPost = async (newUser) => {
  try {
    const response = await api.post(`/api/signup`, newUser);
    if (response.status === 200) {
      alert(response.msg);
    }
  } catch (e) {
    if (e.response.status === 400) {
      alert('예상치 못 한 오류가 발생하였습니다.');
    } else if (e.response.status === 411) {
      alert(e.response.errMsg);
    } else if (e.response.status === 412) {
      alert(e.response.errMsg);
    }
  }
};

// 회원가입에서 전공 불러오는 api
const majorGet = async () => {
  try {
    const response = await api.get(`/api/major`);
    return response.data;
  } catch (e) {
    // console.log(e.response.errMsg);
  }
};

export { loginPost, signupPost, majorGet };
