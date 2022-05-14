import React, {memo} from 'react';
const MapButton = memo(({index, props, onClick}) => {
  console.log(props);
  return (
    <button index={index} onClick={onClick}>
      {props.diary_reg_date.slice(0, 10)} {props.diary_weather_type} {props.diary_feel_type}
    </button>
  );
});
export default MapButton;
