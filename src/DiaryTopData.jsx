import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";
// import { faStar as FaStarRegular } from "@fortawesome/free-regular-svg-icons";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as FaStarRegular } from "@fortawesome/free-regular-svg-icons";
import axios from 'axios';
import {
    faFaceLaughBeam, faFaceAngry, faFaceSadCry, faFaceGrinHearts, faFaceTired, faFaceFrown, faSun
} from "@fortawesome/free-regular-svg-icons";
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Space, Button } from 'antd';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';
import SelectWeather from "./SelectWeather";
import SelectEmotion from "./SelectEmotion";



const DiaryTopData = () => {

    const [data, setData] = useState(null);
    const [weather, setWeather] = useState(null);
    const [emotion, setEmotion] = useState(null);
    const [emotionOptionShown, setEmotionOptionShown] = useState(true);
    const [weatherOptionShown, setWeatherOptionShown] = useState(true);

    /*

        날짜 데이터 =>  날짜 문자열

        weather => 맑음, 흐림, 바람, 비옴, 눈옴, 천둥
        데이터 표현:   0 ,   1,    2,    3,    4,   5 

        emotion => 기쁨,  신남,  슬픔,  피곤함,  찡그림,  분노
             표현:   0 ,     1,    2,      3,     4,    5   


    */

    

    const onHoverWeather = () => {
        setWeatherOptionShown(prevCheck => !prevCheck);
        // console.log('hovercheck', weatherOptionShown);
    }
             
    const onClickWeather = (e) => {
        e.preventDefault();
        // console.log(e.currentTarget.getAttribute('values'))
        const clickValue = e.currentTarget.getAttribute('values');
        setWeather(clickValue);
    }
             
             
    const onHoverEmotion = () => {
        // console.log('hover check');
        setEmotionOptionShown(!emotionOptionShown);
    }
    
    const onClickEmotion = (e) => {
        // e.currentTarget, e.target
        // console.log( e.target, e.currentTarget );
        // console.log(e.currentTarget.getAttribute('values'))
        e.preventDefault();
        const clickValue = e.currentTarget.getAttribute('values');
        setEmotion(clickValue);
    }


    return (
        <>
            <Space>
                <DatePicker />
                <div style={{ display: "inline-block", borderRadius: "10px", border: "3px solid purple", width: '130px' }} onMouseEnter={onHoverWeather} onMouseLeave={onHoverWeather}>
                    { weatherOptionShown ? <span>오늘의 날씨는!<SelectWeather  number={weather} /></span>
                      : <Space>
                        <a href="" values={0} onClick={onClickWeather}>
                            <FontAwesomeIcon icon={faSun} />
                        </a>
                        <a href="" values={1} onClick={onClickWeather}>
                            <FontAwesomeIcon icon={faCloud} />
                        </a>
                        {/* <FontAwesomeIcon icon="fa-regular fa-wind" /> */}
                        {/* <FontAwesomeIcon icon="fa-regular fa-cloud-showers-heavy" /> */}
                        {/* <FontAwesomeIcon icon="fa-regular fa-cloud-snow" /> */}
                        {/* <FontAwesomeIcon icon="fa-regular fa-cloud-bolt" /> */}
                    </Space>}
                </div>
                <div style={{ display: "inline-block", borderRadius: "10px", border: "3px solid purple", width: '130px' }} onMouseEnter={onHoverEmotion} onMouseLeave={onHoverEmotion}>
                    {emotionOptionShown ? <span>오늘의 기분은!<SelectEmotion  number={emotion} /></span>
                    : <Space>
                        <a href="" values={0} onClick={onClickEmotion}>
                            <FontAwesomeIcon  icon={faFaceLaughBeam} />
                        </a>
                        <a href="" values={1} onClick={onClickEmotion}>
                            <FontAwesomeIcon icon={faFaceGrinHearts} />
                        </a>
                        <a href="" values={2} onClick={onClickEmotion}>
                            <FontAwesomeIcon icon={faFaceSadCry} />
                        </a>
                        <a href="" values={3} onClick={onClickEmotion}>
                            <FontAwesomeIcon icon={faFaceTired} />
                        </a>
                        <a href="" values={4} onClick={onClickEmotion}>
                            <FontAwesomeIcon icon={faFaceFrown} />
                        </a>
                        <a href="" values={5} onClick={onClickEmotion}>
                            <FontAwesomeIcon icon={faFaceAngry} />
                        </a>
                    </Space>}
                </div>
            </Space>
        </>
    )

}



export default DiaryTopData;