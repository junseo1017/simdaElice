import React, {useReducer, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {faFaceLaughBeam, faFaceAngry, faFaceSadCry, faFaceGrinHearts, faFaceTired, faFaceFrown, faSun} from '@fortawesome/free-regular-svg-icons';
import {faCloud, faWind, faCloudShowersHeavy, faCloudBolt, faSnowflake} from '@fortawesome/free-solid-svg-icons';
import {DatePicker, Space} from 'antd';
import 'antd/dist/antd.min.css';
import './TopData.css';
// import './datePickerStyle.css';
import WeatherOption from './WeatherOption';
import EmotionOption from './EmotionOption';
import DairyContent from './diarycontent';

// axios({
// 	method: 'get',
// 	url: '/test?name=veneas'
// })
// .then(response => {
//     console.log(response);
// })
// .catch(err => {
//     console.log(err);
// })

const initialState = {
  weather: '',
  emotion: '',
};

export const SET_WEATHER = 'SET_WEATHER';
export const SET_EMOTION = 'SET_EMOTION';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WEATHER: {
      return {
        ...state,
        weather: action.weatherValue,
      };
    }
    case SET_EMOTION: {
      return {
        ...state,
        emotion: action.emotionValue,
      };
    }
    default:
      return state;
  }
};

const DiaryTopData = () => {
  // const [weather, setWeather] = useState(null);
  // const [emotionOptionShown, setEmotionOptionShown] = useState(true);
  // const [emotion, setEmotion] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {weather, emotion} = state;
  // const [weatherOptionShown, setWeatherOptionShown] = useState(true);

  const weatherArray = [faSun, faCloud, faWind, faCloudShowersHeavy, faSnowflake, faCloudBolt];
  const emotionArray = [faFaceLaughBeam, faFaceGrinHearts, faFaceSadCry, faFaceTired, faFaceFrown, faFaceAngry];

  /*

        날짜 데이터 =>  날짜 문자열

        weather => 맑음, 흐림, 바람, 비옴, 눈옴, 천둥
        데이터 표현:   0 ,   1,    2,    3,    4,   5 

        emotion => 기쁨,  신남,  슬픔,  피곤함,  찡그림,  분노
             표현:   0 ,     1,     2,      3,      4,    5   


    */

  // useReducer를 이용해서 자식 컴포넌트에서 state 값을 변경한 것을 적용시켜야함.

  return (
    <>
      <Space align='center'>
        <DatePicker showTime={false} showNow={true} format={' YYYY/ MM/ DD'} bordered={true} className='datestyle' />
        <div className='weather-selection'>
          <WeatherOption weather={weather} dispatch={dispatch} />
          <div className='weather-cover'>
            {weather ? (
              <div className='weather-outer'>
                오늘 날씨
                <FontAwesomeIcon icon={weatherArray[weather]} />!
              </div>
            ) : (
              <div className='weather-outer'>날씨를 입력해주세요!</div>
            )}
            <div className='weather-inner'></div>
          </div>
        </div>
        <div className='emotion-selection'>
          <EmotionOption emotion={emotion} dispatch={dispatch} />
          <div className='emotion-cover'>
            {emotion ? (
              <div className='emotion-outer'>
                오늘 기분
                <FontAwesomeIcon icon={emotionArray[emotion]} />!
              </div>
            ) : (
              <div className='emotion-outer'>기분을 입력해주세요!</div>
            )}
            <div className='emotion-inner'></div>
          </div>
        </div>
      </Space>
    </>
  );
};

export default DiaryTopData;
