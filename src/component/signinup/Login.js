import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.min.css";

import "./Login.css";

function Login({
  user,
  inputID,
  inputPWD,
  setInputID,
  setInputPWD,
  setUser,
  history,
}) {
  const goToMain = () => {
    console.log("go main");
    return <Navigate to="/login" />;
  };

  function handleInputID(event) {
    setInputID(event.target.value);
  }

  function handleInputPWD(event) {
    setInputPWD(event.target.value);
  }

  const onFinish = (values) => {
    //event.preventDefault();
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

  function emailCheck(id) {
    return id.indexOf("@") !== -1;
  }

  function axiosPost(LoginUser) {
    axios
      .post("http://14.35.100.207:3000/users/login", {
        user_id: inputID,
        user_password: inputPWD,
      })
      .then((response) => {
        console.dir(response);
        if (response.data.errorCode === 0) {
          console.log("ok");
          setUser(LoginUser);
          goToMain();
        } else {
          console.log("loginError");
          alert("loginError");
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }

  return (
    <div className="Login">
      <h1>Simda</h1>
      <Form
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
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
          <Input.Password
            onChange={handleInputPWD}
            value={inputPWD}
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
          <Link to="/register">Register</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
