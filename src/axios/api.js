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
    confige.headers.accessToken = accessToken;
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
