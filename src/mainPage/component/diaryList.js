import React, {useState, memo, useRef, useEffect, useCallback} from 'react';
import {Modal, Button} from 'antd';
import axios from 'axios';
import ModalComponent from './diaryListComponent/modalComponent';
import MapButton from './diaryListComponent/mapButton';
import './layout/diaryList.css';

const DiaryList = memo(({listData}) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {current} = listData;
  const sortList = [...current].reverse(); // 다이어리 리스트 최신 작성 순의 배열
  const modalData = useRef(sortList[0]);

  const showModal = useCallback((e) => {
    setVisible(true);
    modalData.current = sortList[e.target.getAttribute('index')];
  }, []);

  const handleOk = useCallback(() => {
    setConfirmLoading(true);
    updateDairy(); // 다이어리 수정
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 50);
  }, []);

  const handleCancel = () => {
    setVisible(false);
    modalData.current = sortList[0];
  };

  const updateDairy = async () => {
    // try {
    //   const res = await axios.put('http://14.35.100.207:3000/diarys/put', {});
    // } catch (err) {
    //   console.error(err);
    // }
    console.log('updateData');
  };

  return (
    <div className='diaryListContainer'>
      {sortList.map((v, i) => {
        return <MapButton sortList={sortList} className='diaryListButton' index={i} showModal={showModal} key={v.update_time} props={v} antdButton={Button} />;
      })}
      <ModalComponent
        visible={visible}
        handleOk={handleOk}
        modalData={modalData}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        sortList={sortList}
      />
    </div>
  );
});

export default DiaryList;
