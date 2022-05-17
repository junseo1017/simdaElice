import React, {memo, useCallback} from 'react';
import {Modal} from 'antd';

const ModalComponent = ({visible, handleOk, handleCancel, confirmLoading, sortList, modalData}) => {
  const {diary_content, update_time, diary_feel_type, diary_weather_type} = modalData.current;
  const changeWeatherData = useCallback((data) => {
    switch (data) {
      case 1:
        return '맑음';
      case 2:
        return '흐림';
      case 3:
        return '비 내림';
      case 4:
        return '번개침';
      case 5:
        return '바람 붐';
      case 6:
        return '눈 내림';
      default:
        return;
    }
  }, []);

  const changeFeelData = useCallback((data) => {
    switch (data) {
      case 1:
        return '행복';
      case 2:
        return '별로';
      case 3:
        return '좋음';
      case 4:
        return '신남';
      case 5:
        return '분노';
      case 6:
        return '우울';
      default:
        return;
    }
  }, []);
  return (
    <>
      <Modal mask={true} maskStyle={{backgroundColor: 'transparent'}} onOk={handleOk} visible={visible} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <h1>{update_time.slice(0, 10)}</h1>
        <div>
          <h2>
            <b>오늘의 날씨 : {changeWeatherData(diary_weather_type)}</b>
          </h2>
        </div>
        <div>
          <h2>
            <b>오늘의 기분 : {changeFeelData(diary_feel_type)}</b>
          </h2>
        </div>
        <div className='paper'>
          <div className='paper-content'>
            <textarea value={diary_content}></textarea>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
