import React from "react";
import { Route, Routes } from "react-router-dom";

import SignUp from "./sign/SignUp.js";
import SignIn from "./sign/SignIn.js";
import Diary from "./mainPage/diary.jsx";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<Diary />} />
    </Routes>
  );
};
export default App;
