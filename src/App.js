import React from 'react';
import './App.css';
import Login from './component/signinup/Login.js';
import Diary from './component/mainPageSelect/diary';
import SignUp from './component/signinup/sign.js';
import {useState} from 'react';
import {Route, Routes} from 'react-router-dom';

const App = () => {
  const [inputID, setInputID] = useState('');
  const [inputPWD, setInputPWD] = useState('');
  const [user, setUser] = useState({});

  return (
    <Routes>
      <Route
        path='/'
        element={<Login user={user} inputID={inputID} inputPWD={inputPWD} setInputID={setInputID} setInputPWD={setInputPWD} setUser={setUser}></Login>}
      />
      <Route path='/' element={<Diary />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/main' element={<SignUp user={user} />} />
    </Routes>
  );
};
export default App;
