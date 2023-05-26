import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use((confige) => {
  confige.headers = {};
  confige.headers['Content-Type'] = 'application/json';
  // 로그인 여부 확인
  let isLogin = false;

  let accessToken;
  let refreshToken;

  const checkLogin = (accessToken, refreshToken) => {
    if (accessToken !== '' && refreshToken !== '') isLogin = true;
    else isLogin = false;
  };

  accessToken = Cookies.get('accessToken');
  refreshToken = Cookies.get('refreshToken');

  if (accessToken && refreshToken) {
    checkLogin(refreshToken, refreshToken);
  }

  // 로그인 되었다면 헤더에 토큰 추가.

  if (isLogin) {
    confige.headers.accessToken = accessToken;
    confige.headers.refreshToken = refreshToken;
  }
  return confige;
});

instance.interceptors.response.use((respones) => {
  // 응답에 토큰이 있다면 토큰 저장
  try {
    // console.log(`interceptor response => ${respones}`);

    const res = respones.data;

    if (res?.accessToken === '') {
      return;
    } else if (res?.accessToken !== '') {
      Cookies.set('accessToken', res.accessToken);
    }
  } catch (e) {
    console.log(e);
  }
});
export default instance;
