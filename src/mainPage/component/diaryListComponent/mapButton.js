import React, {memo, useCallback} from 'react';
import {Modal, Button} from 'antd';

const MapButton = memo(({modalText, index, props, confirmLoading, showModal, handleOk, handleCancel, visible}) => {
  return (
    <div index={index}>
      <Button index={index} onClick={showModal}>
        {props.diary_reg_date.slice(0, 10)}일에 작성! {props.diary_weather_type} {props.diary_feel_type}
      </Button>
      <Modal
        mask={true}
        maskStyle={{backgroundColor: 'transparent'}}
        title='Title'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
    </div>
  );
});
export default MapButton;
