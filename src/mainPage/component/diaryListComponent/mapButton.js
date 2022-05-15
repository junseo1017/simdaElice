import React, {memo} from 'react';
import {Button} from 'antd';

const MapButton = ({index, props, showModal}) => {
  return (
    <Button index={index} onClick={showModal}>
      <span index={index}>{props.update_time.slice(0, 10)}에 작성한 다이어리</span>
    </Button>
  );
};
export default MapButton;
