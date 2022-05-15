import React, { memo, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faWind, faCloudShowersHeavy, faCloudBolt, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { Space } from 'antd';
import { SET_WEATHER } from '../DiaryTopData';




const WeatherOption = memo(({ weather, dispatch }) => {
    const weatherArray = [faSun, faCloud, faCloudShowersHeavy, faCloudBolt, faWind, faSnowflake];

    const onClickWeather = useCallback((e) => {
        e.preventDefault();
        const clickValue = e.currentTarget.getAttribute('values');
        dispatch({ type: SET_WEATHER, weatherValue: clickValue })
    }, [weather]);

    return (
        <Space className="weather-option">
            { weatherArray.map((option, i) =>
                    <a href="" values={i} key={option+i} onClick={onClickWeather}>
                        <FontAwesomeIcon icon={option} />
                    </a>)
            }
        </Space>
    )
});

export default WeatherOption;