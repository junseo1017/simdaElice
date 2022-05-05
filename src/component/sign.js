import React, {useState, memo, useRef} from 'react';
import './sign.css';
import axios from 'axios';
// import './loginRef';
import './diary.js';
import {useNavigate, Link, Navigate} from 'react-router-dom';

const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const SignUp = memo(() => {
  const [userData, setUserData] = useState({});
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [pwCheckAlert, setPwCheckAlert] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  // const navigate = useNavigate();
  // 회원가입 버튼 중복 클릭 방지
  const clickable = useRef(false);

  async function getPost() {
    try {
      const response = await axios.post('http://14.35.100.207:3000/users/regist', {
        user_id: name,
        user_password: password,
      });
      console.log(response);
    } catch (error) {
      console.err(error);
    }
  }

  const onChange = (e) => {
    clickable.current = true;
    if (e.target.id === 'nameInput') {
      setName(e.target.value);
    } else if (e.target.id === 'emailInput') {
      setEmail(e.target.value);
    } else if (e.target.id === 'pwInput') {
      setPassword(e.target.value);
    } else if (e.target.id === 'pwCkInput') {
      setPwCheck(e.target.value);
    }
    reg.test(email) ? setEmailAlert('유효한 이메일입니다.') : setEmailAlert('이메일 형식에 맞게 작성해주세요.');
    password.length < 8 ? setPasswordAlert('비밀번호는 8자 이상 입력해주세요') : setPasswordAlert('유효한 비밀번호입니다.');
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!clickable.current) return;
    if (!email && !name && !password && !pwCheck) return;
    // input 유효성 검사
    if (!reg.test(email)) return;
    // email 유효성 검사
    if (pwCheck !== password) {
      // 비밀번호 유효성 검사
      passwordFunc();
      return;
    }
    // 데이터 저장하는 함수
    setUserData({
      user_id: name,
      user_password: password,
      // email: email,
    });
    // getPost();
    clickable.current = false;
  };
  const passwordFunc = () => {
    setPwCheckAlert('비밀번호 항목에 입력한 값과 다릅니다.');
    setTimeout(() => {
      setPwCheckAlert('');
    }, 1000);
    return;
  };

  return (
    <>
      <div className='formDiv'>
        <h1>회원가입</h1>
        <Link to='./diary.js'>링크 이름</Link>
        <form onSubmit={onSubmit} className='formTag'>
          <div className='inputContainer'>
            <label htmlFor='nameInput'>이름</label>
            <input type='text' id='nameInput' onChange={onChange} />
            <div></div>
          </div>
          <div className='inputContainer'>
            <label htmlFor='emailInput'>이메일</label>
            <input type='text' id='emailInput' onChange={onChange} />
            <div>{emailAlert}</div>
          </div>
          <div className='inputContainer'>
            <label htmlFor='pwInput'>비밀번호</label>
            <input type='text' id='pwInput' onChange={onChange} />
            <div>{passwordAlert}</div>
          </div>
          <div className='inputContainer'>
            <label htmlFor='pwCkInput'>비밀번호 확인</label>
            <input type='text' id='pwCkInput' onChange={onChange} />
            <div>{pwCheckAlert}</div>
          </div>
          <button>회원가입 완료!</button>
        </form>
      </div>
    </>
  );
});

export default SignUp;
