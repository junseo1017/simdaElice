import React, {useState, memo, useEffect, useCallback, useRef} from 'react';
import {Modal, Button} from 'antd';

import MapButton from './diaryListComponent/mapButton';
import './layout/diaryList.css';

const DiaryList = memo(({listData}) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const modalRef = useRef('');
  const {current} = listData;
  const sortList = [...current].reverse(); // 다이어리 리스트 최신 작성 순의 배열
  useEffect(() => {
    console.log(`listData:${current}`);
  });

  const showModal = (e) => {
    setVisible(true);
    setModalText(JSON.stringify(sortList[e.target.parentNode.getAttribute('index')]));
  };

  const handleOk = (e) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <div className='diaryListContainer'>
        {sortList.map((v, i) => {
          return (
            <MapButton
              sortList={sortList}
              className='diaryListButton'
              index={i}
              modalText={modalText}
              confirmLoading={confirmLoading}
              visible={visible}
              handleCancel={handleCancel}
              handleOk={handleOk}
              showModal={showModal}
              key={v.update_time}
              props={v}
              antdButton={Button}
              antdModal={Modal}
              modalRef={modalRef}
            />
          );
        })}
      </div>
    </>
  );
});

export default DiaryList;
