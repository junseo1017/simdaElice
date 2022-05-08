import React, { memo, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faWind, faCloudShowersHeavy, faCloudBolt, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { Space } from 'antd';
import { SET_WEATHER } from './DiaryTopData';




const WeatherOption = memo(({ weather, dispatch }) => {
    // const weatherArray = [faSun, faCloud, faWind, faCloudShowersHeavy, faSnowflake, faCloudBolt];
    // console.log(values, weatherArray[values]);

    const onClickWeather = useCallback((e) => {
        e.preventDefault();
        // console.log(e.currentTarget.getAttribute('values'))
        const clickValue = e.currentTarget.getAttribute('values');
        dispatch({type: SET_WEATHER, weatherValue: clickValue})
        // setWeather(clickValue);
    }, []);

    return (
        <div className="weather-option">
            <a href="" values={0} onClick={onClickWeather}>
                <FontAwesomeIcon icon={faSun} />
            </a>
            <a href="" values={1} onClick={onClickWeather}>
                <FontAwesomeIcon icon={faCloud} />
            </a>
            <a href="" values={2} onClick={onClickWeather}>
                <FontAwesomeIcon icon={faWind} />
            </a>
            <a href="" values={3} onClick={onClickWeather}>
                <FontAwesomeIcon icon={faCloudShowersHeavy} />
            </a>
            <a href="" values={4} onClick={onClickWeather}>
                <FontAwesomeIcon icon={faSnowflake} />
            </a>
            <a href="" values={5} onClick={onClickWeather}>
                <FontAwesomeIcon icon={faCloudBolt} />
            </a>
        </div>
    )
});

export default WeatherOption ;