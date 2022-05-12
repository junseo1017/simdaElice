import React, { memo, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileBeam, faFaceGrinHearts, faFaceSadCry, faFaceTired, faFaceFrown, faFaceAngry } from "@fortawesome/free-solid-svg-icons"
import { Space } from 'antd';
import { SET_EMOTION } from '../DiaryTopData';


const EmotionOption = memo(({ emotion, dispatch }) => {
    const emotionArray = [faFaceSmileBeam, faFaceGrinHearts, faFaceSadCry, faFaceTired, faFaceFrown, faFaceAngry];

    const onClickEmotion = useCallback((e) => {
        e.preventDefault();
        const clickValue = e.currentTarget.getAttribute('values');
        dispatch({type: SET_EMOTION, emotionValue: clickValue})
    }, [emotion]);
    
    return (
        <Space className="emotion-option">
            { emotionArray.map((option, i) =>
                    <a href="" values={i} key={option+i} onClick={onClickEmotion}>
                        <FontAwesomeIcon icon={option} />
                    </a>)
            }
        </Space>
    )
});

export default EmotionOption;