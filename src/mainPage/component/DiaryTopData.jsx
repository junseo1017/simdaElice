import React, { memo, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun, faCloud, faWind, faCloudShowersHeavy, faCloudBolt, faSnowflake,
  faFaceSmileBeam, faFaceLaughSquint, faFaceSadCry, faFaceTired, faFaceKiss, faFaceAngry
} from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.min.css';
import './layout/TopData.css';
import WeatherOption from "./topContent/WeatherOption";
import EmotionOption from "./topContent/EmotionOption";

const initialState = {
  date: "",
  weather: "",
  emotion: "",
};

export const SET_WEATHER = "SET_WEATHER";
export const SET_EMOTION = "SET_EMOTION";
export const SET_DATE = "SET_DATE";
export const GET_DATA = "GET_DATA";

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
    case SET_DATE: {
      return {
        ...state,
        date: action.dateValue,
      };
    }
    case GET_DATA: {
      return {
        ...state,
        date: action.dateValue,
        weather: action.weatherValue,
        emotion: action.emotionValue,
      };
    }
    default:
      return state;
  }
};

const DiaryTopData = memo(({ setTopData }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { weather, emotion } = state;

  const weatherArray = [faSun, faCloud, faCloudShowersHeavy, faCloudBolt, faWind, faSnowflake];
  const emotionArray = [faFaceSadCry, faFaceKiss, faFaceSmileBeam, faFaceLaughSquint, faFaceAngry, faFaceTired];

  const onChangePage = (e) => {
    const selectDate = e._d.toString().split(" ");
    const datePack = [selectDate[3], selectDate[1], selectDate[2]];

    setTopData({
      date: datePack,
      weather,
      emotion,
    });
  };

  return (
    <>
      <Space align="center">
        <DatePicker
          showTime={false} showNow={true} format={' YYYY  /  MM  /  DD'} bordered={true}
          className="datestyle" onChange={onChangePage}
        />
        <div className="weather-selection">
          <WeatherOption weather={weather} dispatch={dispatch} />
          <div className="weather-cover">
            {weather ? 
              <div className="weather-outer">
                날씨는&emsp;
                <span className="weather-icon">
                  <FontAwesomeIcon icon={weatherArray[weather]} />
                </span>
                &ensp;!
              </div>
              : <div className="weather-outer">날씨를 선택해주세요!</div>
            }
            <div className="weather-inner"></div>
          </div>
        </div>
        <div className="emotion-selection">
          <EmotionOption emotion={emotion} dispatch={dispatch} />
          <div className="emotion-cover">
            {emotion ? 
              <div className="emotion-outer">
                기분은&emsp;
                <span className="emotion-icon">
                  <FontAwesomeIcon icon={emotionArray[emotion]} />
                </span>
                &ensp;!
              </div>
              : <div className="emotion-outer">기분을 선택해주세요!</div>
            }
            <div className="emotion-inner"></div>
          </div>
        </div>
      </Space>
    </>
  );
});

export default DiaryTopData;
