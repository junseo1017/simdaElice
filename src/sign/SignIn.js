import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.min.css";

import "./signin.css";

const SignIn = () => {
  const [inputID, setInputID] = useState("");
  const [inputPWD, setInputPWD] = useState("");
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/main");
  };

  function handleInputID(event) {
    setInputID(event.target.value);
  }

  function handleInputPWD(event) {
    setInputPWD(event.target.value);
  }

  const onFinish = (values) => {
    // if (!emailCheck(inputID)) {
    //   window.alert("이메일 형식이 맞지 않습니다.");
    //   return;
    // }
    const LoginUser = { user_id: inputID, user_password: inputPWD };
    setInputID("");
    setInputPWD("");
    axiosPost(LoginUser);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const emailCheck = (id) => {
    return id.indexOf("@") !== -1;
  };

  const axiosPost = (LoginUser) => {
    axios
      .post("http://14.35.100.207:3000/users/login", {
        user_email: inputID,
        user_password: inputPWD,
      })
      .then((response) => {
        if (response.data.errorCode === 0) {
          goToMain();
        } else {
          alert("잘못된 정보입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Login">
      <h1>Simple Diary - Simda</h1>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            onChange={handleInputID}
            value={inputID}
            placeholder="Please input your Email!"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            onChange={handleInputPWD}
            value={inputPWD}
            type="password"
            placeholder="Please input your password!"
          />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Link to="/signup">
            <Button type="primary" htmlType="submit">
              SignUp
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
