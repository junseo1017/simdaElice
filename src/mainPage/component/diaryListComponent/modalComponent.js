import React, {memo, useCallback} from 'react';
import {Modal} from 'antd';

const ModalComponent = ({visible, handleOk, handleCancel, confirmLoading, sortList, modalData}) => {
  const {diary_content, update_time, diary_seq, diary_feel_type, diary_weather_type} = modalData.current;

  const changeWeatherData = useCallback((data) => {
    switch (data) {
      case 1:
        return '맑음';
      default:
        return;
    }
  }, []);

  const changeFeelData = useCallback((data) => {
    switch (data) {
      case 1:
        return '기분 좋음';
      default:
        return;
    }
  }, []);
  return (
    <>
      <Modal mask={true} maskStyle={{backgroundColor: 'transparent'}} onOk={handleOk} visible={visible} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <div className='modalContentContainer'>
          <h1>{update_time.slice(0, 10)}</h1>
          <span>{changeWeatherData(diary_weather_type)}</span>
          <span>{changeFeelData(diary_feel_type)}</span>
          <div>{diary_seq}</div>
          <div className='paper'>
            <div className='paper-content'>
              <textarea value={diary_content}></textarea>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
