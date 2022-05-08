import React, {useState, memo, useRef} from 'react';
import './sign.css';
import {Typography, Input, Button} from 'antd';
import axios from 'axios';
import {useNavigate, Link, Navigate} from 'react-router-dom';

const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const SignUp = memo(() => {
  const [emailAlert, setEmailAlert] = useState([{message: '', status: ''}]);
  const [passwordAlert, setPasswordAlert] = useState([{message: '', status: ''}]);
  const [pwCheckAlert, setPwCheckAlert] = useState([{message: '', status: ''}]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  // 회원가입 버튼 중복 클릭 방지
  const clickable = useRef(false);
  const navigate = useNavigate();
  async function getPost() {
    try {
      const response = await axios.post('http://14.35.100.207:3000/users/regist', {
        user_email: email,
        user_name: name,
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
      reg.test(email)
        ? setEmailAlert([{message: '유효한 이메일입니다.', status: 'success'}])
        : setEmailAlert([{message: '이메일 형식에 맞게 작성해주세요.', status: 'warning'}]);
    } else if (e.target.id === 'pwInput') {
      setPassword(e.target.value);
      password.length >= 8
        ? setPasswordAlert([{message: '유효한 비밀번호입니다.', status: 'success'}])
        : setPasswordAlert([{message: '비밀번호는 8자 이상 입력해주세요', status: 'warning'}]);
    } else if (e.target.id === 'pwCkInput') {
      setPwCheck(e.target.value);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    if (!clickable.current) return;
    if (!email && !name && !password && !pwCheck) return;
    // input 유효성 검사
    if (!reg.test(email)) return;
    // email 유효성 검사
    if (pwCheck !== password || password.length < 8) {
      // 비밀번호 유효성 검사
      passwordFunc();
      return;
    }
    getPost();
    console.log(email);
    console.log(password);
    navigate(`./diary.js`);
    clickable.current = false;
  };

  const passwordFunc = () => {
    setPwCheckAlert([{message: '비밀번호가 일치하지 않습니다.', status: 'warning'}]);
    setTimeout(() => {
      setPwCheckAlert([{message: '', status: ''}]);
    }, 1000);
    return;
  };

  return (
    <>
      <div className='formDiv'>
        <Typography.Title>Sign Up</Typography.Title>
        <form className='formTag'>
          <div className='inputContainer'>
            <Typography.Title level={5}>NickName</Typography.Title>
            <Input status='' size='large' type='text' id='nameInput' onChange={onChange}></Input>
            <div></div>
          </div>
          <div className='inputContainer'>
            <Typography.Title level={5}>Email</Typography.Title>
            <Input size='large' type='text' id='emailInput' onChange={onChange}></Input>
            <Typography.Text type={emailAlert[0].status}>{emailAlert[0].message}</Typography.Text>
          </div>
          <div className='inputContainer'>
            <Typography.Title level={5}>Password</Typography.Title>
            <Input size='large' type='password' id='pwInput' onChange={onChange}></Input>
            <Typography.Text type={passwordAlert[0].status}>{passwordAlert[0].message}</Typography.Text>
          </div>
          <div className='inputContainer'>
            <Typography.Title level={5}>Check Password</Typography.Title>
            <Input size='large' type='password' id='pwCkInput' onChange={onChange}></Input>
            <Typography.Text type={pwCheckAlert[0].status}>{pwCheckAlert[0].message}</Typography.Text>
          </div>
          <Button type='primary' size='large' onClick={onClick}>
            Complete Sign up!
          </Button>
        </form>
      </div>
    </>
  );
});

export default SignUp;