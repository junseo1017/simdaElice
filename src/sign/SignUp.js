import React, { useState, memo, useRef, useCallback, useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Typography, Input, Button } from "antd";
import axios from "axios";

import "./signup.css";

const initialState = {
  emailAlert: { message: "", status: "" },
  passwordAlert: { message: "", status: "" },
  pwCheckAlert: { message: "", status: "" },
};

const action = {
  EMAILCHECK: "EMAILCHECK",
  PASSWORDCHECK: "PASSWORDCHECK",
  PWCHECK: "PWCHECK",
};

const reducer = (alert, action) => {
  const { EMAILCHECK, PASSWORDCHECK, PWCHECK } = action;
  switch (action.type) {
    case EMAILCHECK:
      return {
        ...alert,
        emailAlert: action.emailAlert,
      };
    case PASSWORDCHECK:
      return {
        ...alert,
        passwordAlert: action.passwordAlert,
      };
    case PWCHECK:
      return {
        ...alert,
        pwCheck: action.pwCheckAlert,
      };
    default:
      return {
        ...alert,
      };
  }
};

const SignUp = () => {
  const [alert, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const reg = useRef(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  );

  const clickable = useRef(false);
  const navigate = useNavigate();

  async function getPost() {
    try {
      const response = await axios.post(
        "http://14.35.100.207:3000/users/regist",
        {
          user_email: email,
          user_name: name,
          user_password: password,
        }
      );
      await navigate(`./diary.js`);
    } catch (err) {
      console.error(err);
    }
  }

  const onChange = (e) => {
    clickable.current = true;
    if (e.target.id === "nameInput") {
      setName(e.target.value);
    } else if (e.target.id === "emailInput") {
      setEmail(e.target.value);
      reg.current.test(email)
        ? dispatch({
            type: "EMAILCHECK",
            emailAlert: { message: "유효한 이메일입니다.", status: "success" },
          })
        : dispatch({
            type: "EMAILCHECK",
            emailAlert: {
              message: "이메일 형식에 맞게 작성해주세요.",
              status: "warning",
            },
          });
    } else if (e.target.id === "pwInput") {
      setPassword(e.target.value);
      password.length >= 8
        ? dispatch({
            type: "PASSWORDCHECK",
            passwordAlert: {
              message: "유효한 비밀번호입니다.",
              status: "success",
            },
          })
        : dispatch({
            type: "PASSWORDCHECK",
            passwordAlert: {
              message: "비밀번호는 8자 이상 입력해주세요",
              status: "warning",
            },
          });
    } else if (e.target.id === "pwCkInput") {
      setPwCheck(e.target.value);
    }
    console.log(name, email, password, pwCheck);
  };

  const onClick = useCallback((e) => {
    e.preventDefault();
    if (!clickable.current) return;
    if (!email && !name && !password && !pwCheck) return;
    if (!reg.test(email)) return;
    if (pwCheck !== password || password.length < 8) {
      passwordFunc();
      return;
    }
    // getPost();
    console.log(name);
    console.log(email);
    console.log(password);
    console.log("done");
    clickable.current = false;
  }, []);

  const passwordFunc = useCallback(() => {
    dispatch({
      type: "PWCHECK",
      pwCheckAlert: {
        message: "비밀번호가 일치하지 않습니다.",
        status: "warning",
      },
    });
    setTimeout(() => {
      dispatch({
        type: "PWCHECK",
        pwCheckAlert: { message: "", status: "" },
      });
    }, 1000);
    return;
  }, []);

  return (
    <>
      <div className="formDiv">
        <Typography.Title>Sign Up</Typography.Title>
        <form className="formTag">
          <div className="inputContainer">
            <Typography.Title level={5}>NickName</Typography.Title>
            <Input
              status=""
              size="large"
              type="text"
              id="nameInput"
              onChange={onChange}
            ></Input>
            <div></div>
          </div>
          <div className="inputContainer">
            <Typography.Title level={5}>Email</Typography.Title>
            <Input
              size="large"
              type="text"
              id="emailInput"
              onChange={onChange}
            ></Input>
            <Typography.Text type={alert.emailAlert.status}>
              {alert.emailAlert.message}
            </Typography.Text>
          </div>
          <div className="inputContainer">
            <Typography.Title level={5}>Password</Typography.Title>
            <Input
              size="large"
              type="password"
              id="pwInput"
              onChange={onChange}
            ></Input>
            <Typography.Text type={alert.passwordAlert.status}>
              {alert.passwordAlert.message}
            </Typography.Text>
          </div>
          <div className="inputContainer">
            <Typography.Title level={5}>Check Password</Typography.Title>
            <Input
              size="large"
              type="password"
              id="pwCkInput"
              onChange={onChange}
            ></Input>
            <Typography.Text type={alert.pwCheckAlert.status}>
              {alert.pwCheckAlert.message}
            </Typography.Text>
          </div>
          <Button type="primary" size="large" onClick={onClick}>
            Complete Sign up!
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
