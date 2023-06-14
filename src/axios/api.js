import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers = {};

  //경로에 따라 컨텐트타입지정, 기본적으로는 application/json 입니다.
  if (config.url === '/api/question_file') {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  // 로그인 여부 확인
  const accessToken = Cookies.get('accessToken');

  // 로그인 되었다면 헤더에 토큰 추가.
  if (accessToken) {
    config.headers.accessToken = accessToken;
  }
  return config;
});

instance.interceptors.response.use((response) => {
  // 응답에 토큰이 있다면 토큰 저장
  try {
    const res = response.data;

    if (!res.accesstoken) {
      return response;
    } else {
      Cookies.set('accessToken', res.accesstoken);
      const userInfo = jwtDecode(res.accesstoken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    return response;
  } catch (e) {
    console.log(e);
  }
});
export default instance;
