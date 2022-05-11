import React, { memo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceLaughBeam,
  faFaceAngry,
  faFaceSadCry,
  faFaceGrinHearts,
  faFaceTired,
  faFaceFrown,
  faSun,
} from "@fortawesome/free-regular-svg-icons";

import { SET_EMOTION } from "../DiaryTopData";

const EmotionOption = memo(({ emotion, dispatch }) => {
  // const emotionArray = [faFaceLaughBeam, faFaceGrinHearts, faFaceSadCry, faFaceTired, faFaceFrown, faFaceAngry];

  const onClickEmotion = useCallback((e) => {
    e.preventDefault();
    const clickValue = e.currentTarget.getAttribute("values");
    dispatch({ type: SET_EMOTION, emotionValue: clickValue });
  }, []);

  return (
    <div className="emotion-option">
      <a href="" values={0} onClick={onClickEmotion}>
        <FontAwesomeIcon icon={faFaceLaughBeam} />
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
    </div>
  );
});

export default EmotionOption;
