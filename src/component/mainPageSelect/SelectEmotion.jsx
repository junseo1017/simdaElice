import React, { memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFaceLaughBeam, faFaceAngry, faFaceSadCry, faFaceGrinHearts, faFaceTired, faFaceFrown, faSun
} from "@fortawesome/free-regular-svg-icons";

const SelectEmotion = memo(({ number }) => {
    const emotionArray = [faFaceLaughBeam, faFaceGrinHearts, faFaceSadCry, faFaceTired, faFaceFrown, faFaceAngry];

    return (
        <>
            <FontAwesomeIcon icon={emotionArray[number]} />
        </>
    )
});

export default SelectEmotion;