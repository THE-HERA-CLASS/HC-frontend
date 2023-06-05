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

// 이메일 중복 체크
const emailConfirmGet = async (email) => {
  // const response = await api.get(`/api/emailExists/${email}`);
  // return new Promise((resolve, reject) => {
  //   if (response.status === 200) {
  //     alert(response.msg);
  //     resolve();
  //   } else if (response.status === 201) {
  //     alert('이미 사용중인 이메일입니다.');
  //     reject();
  //   } else if (response.status === 400) {
  //     alert('예상치 못 한 오류가 발생하였습니다.');
  //     reject();
  //   } else {
  //     alert(`이메일을 입력해주세요.`);
  //     reject();
  //   }
  // });

  try {
    const response = await api.get(`/api/emailExists/${email}`);

    if (response.status === 200) {
      alert(`사용 가능한 이메일입니다.`);
      /* 200으로 성공했을 때 true 혹은 Promise.resolve()를 return해줘야 함. */
      return response.status;
    } else if (response.status === 201) {
      alert(`이미 사용중인 이메일입니다.`);
    }
  } catch (e) {
    if (e.response.status === 400) {
      alert('예상치 못 한 오류가 발생하였습니다.');
    } else if (e.response.status === 411) {
      alert(`이메일을 입력해주세요.`);
    }
  }
};

// 닉네임 중복 체크
const nicknameConfirmGet = async (nickName) => {
  try {
    const response = await api.get(`/api/nicknameExists/${nickName}`);
    if (response.status === 200) {
      alert(`사용 가능한 닉네임입니다.`);
      return response.status;
    } else if (response.status === 201) {
      alert(`이미 사용중인 닉네임입니다.`);
    }
  } catch (e) {
    if (e.response.status === 400) {
      alert('예상치 못 한 오류가 발생하였습니다.');
    } else if (e.response.status === 411) {
      alert(`닉네임을 입력해주세요.`);
    }
  }
};

//회원가입 이메일 인증 코드 발송
const authMailPost = async (email) => {
  try {
    const response = await api.post(`/api/sendAuthMail`, email);
    console.log(response);
    if (response.status === 200) {
      alert(`입력하신 이메일로 인증코드를 발송 하였습니다. 인증 코드를 입력해주세요`);
    }
  } catch (e) {
    if (e.response.status === 400) {
      alert(e.response.data.errMsg);
    } else if (e.response.status === 411) {
      alert(e.response.data.errMsg);
    }
  }
};

//회원가입에 이메일 인증요청
const verifyMailPost = async (verify) => {
  try {
    const response = await api.post(`/api/verifyMail`, verify);
    if (response.status === 200) {
      alert(response.msg);
    }
  } catch (e) {
    if (e.response.status === 400) {
      alert(e.response.errMsg);
    } else if (e.response.status === 411) {
      alert(e.response.errMsg);
    }
  }
};
export { loginPost, signupPost, emailConfirmGet, nicknameConfirmGet, authMailPost, verifyMailPost };
