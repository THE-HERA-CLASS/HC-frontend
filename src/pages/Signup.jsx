import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { majorGet } from '../api/users';

function Signup() {
  //전공 불러오기
  const { data } = useQuery('major', majorGet);

  // 인풋 관리
  // const [userInput, setUserInput] = useState({
  //   email: '',
  //   nickname: '',
  //   password: '',
  //   major_id: 0,
  // });

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [major_id, setMajor_id] = useState('');

  //오류메세지 상태저장
  const [emailMsg, setEmailMsg] = useState('');
  const [nicknameMsg, setNicknameMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  //유효성검사
  const [isEmail, setIsEmail] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isMajor, setIsMajor] = useState(false);

  // 인풋 이벤트 헨들러
  // const userInputChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setUserInput({
  //     ...userInput,
  //     [name]: value,
  //   });
  // };

  // 이메일 이벤트 핸들러
  const onChangeEmailHandler = (e) => {
    const emailRegex = /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMsg('이메일 형식이 틀렸습니다. 다시 확인해주세요.');
      setIsEmail(false);
    } else {
      setEmailMsg('올바른 이메일 형식입니다.');
      setIsEmail(true);
    }
  };

  //닉네임 이벤트 핸들러
  const onChangeNicknameHandler = (e) => {
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    const nicknameCurrent = e.target.value;
    setNickname(nicknameCurrent);

    if (!nicknameRegex.test(nicknameCurrent)) {
      setNicknameMsg('영문 대소문자, 숫자, 한글로 2글자 이상 10글자 이하로 입력해주세요.');
      setIsNickname(false);
    } else {
      setNicknameMsg('올바른 닉네임 형식입니다.');
      setIsNickname(true);
    }
  };

  //비밀번호 이벤트 핸들러
  const onChangePasswordHandler = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,15}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMsg('영문 대소문자, 숫자, 특수문자를 사용한 최소 8글자 최대 15글자를 입력해주세요.');
      setIsPassword(false);
    } else {
      setPasswordMsg('올바른 비밀번호 형식입니다.');
      setIsPassword(true);
    }
  };

  //전공 이벤트 핸들러
  const onChangeMajorHandler = (e) => {
    const majorCurrent = e.target.value;
    setMajor_id(majorCurrent);

    if (majorCurrent === '') {
      setIsMajor(false);
    } else {
      setIsMajor(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      nickname,
      password,
      major_id,
    };
    console.log(newUser);
  };
  const Options = [
    { major_id: '1', name: '포크레인' },
    { major_id: '2', name: '굴삭기' },
    { major_id: '3', name: '컴퓨터공학' },
  ];
  return (
    <form onSubmit={submitHandler}>
      <input
        name='email'
        onChange={onChangeEmailHandler}
        value={email}
        type='email'
        placeholder='email@gamil.com'
        pattern='[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*'
      />
      {email.length > 0 && <span>{emailMsg}</span>}
      <input name='nickname' onChange={onChangeNicknameHandler} value={nickname} type='text' placeholder='닉네임' />
      {nickname.length > 0 && <span>{nicknameMsg}</span>}
      <input
        name='password'
        onChange={onChangePasswordHandler}
        value={password}
        type='password'
        placeholder='비밀번호'
      />
      {password.length > 0 && <span>{passwordMsg}</span>}
      <select name='major_id' value={major_id} onChange={onChangeMajorHandler}>
        <option value=''>===전공 선택===</option>
        {Options?.map((major) => {
          return (
            <option key={major.major_id} value={major.major_id}>
              {major.name}
            </option>
          );
        })}
      </select>
      {major_id === '' && <span>전공을 선택해주세요</span>}
      <button type='submit' disabled={!(isEmail && isNickname && isPassword && isMajor)}>
        회원가입
      </button>
    </form>
  );
}

export default Signup;
