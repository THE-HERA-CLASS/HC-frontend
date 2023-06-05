import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers = {};
  config.headers['Content-Type'] = 'application/json';
  // 로그인 여부 확인
  let isLogin = false;

  let accessToken;

  const checkLogin = (accessToken) => {
    if (accessToken !== '') isLogin = true;
    else isLogin = false;
  };

  accessToken = Cookies.get('accessToken');

  if (accessToken) {
    checkLogin(accessToken);
  }

  // 로그인 되었다면 헤더에 토큰 추가.

  if (isLogin) {
    config.headers.accessToken = accessToken;
  }
  return config;
});

instance.interceptors.response.use((response) => {
  // 응답에 토큰이 있다면 토큰 저장
  try {
    const res = response;

    if (res?.accessToken === '') {
      return;
    } else if (res?.accessToken !== '') {
      Cookies.set('accessToken', res?.accessToken);
    }

    return response;
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
});
export default instance;
