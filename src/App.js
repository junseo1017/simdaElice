import React from 'react';
import './App.css';
import Login from './component/signinup/Login.js';
import SignUp from './component/signinup/sign.js';
import ImageUpload from './components/ImageUpload';
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
      <Route path='/signup' element={<SignUp />} />
      <Route path='/main' element={<SignUp user={user} />} />
      <Route path='/main' element={<ImageUpload />} />
    </Routes>
  );
};
export default App;
