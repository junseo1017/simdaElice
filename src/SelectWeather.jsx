import React, { memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faSun } from "@fortawesome/free-regular-svg-icons";

const SelectEmotion = memo(({ number }) => {
  const weatherArray = [faSun, faCloud];
  // console.log(values, weatherArray[values]);
  return (
    <>
      <FontAwesomeIcon icon={weatherArray[number]} />
    </>
  )
});

export default SelectEmotion;