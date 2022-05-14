import React, {useState, memo, useEffect, useCallback, useRef} from 'react';
import MapButton from './diaryListComponent/mapButton';
import './layout/diaryList.css';

const DiaryList = memo(({listData}) => {
  const {current} = listData;
  const sortList = [...current].reverse(); // 다이어리 리스트 최신 작성 순의 배열
  useEffect(() => {
    console.log(`listData:${current}`);
  });
  const onClickList = (e) => {
    // 각 인덱스에 맞는 값을 불러오기 첫번째칸 > 데이터 배열의 첫번째 요소
    // getAttribute > 요소의 속성 직접 가져옴(custom attribute 가져올때 유용함)
    console.log(sortList[e.target.getAttribute('index')]);
  };
  return (
    <>
      <div className='diaryListContainer'>
        {sortList.map((v, i) => {
          return <MapButton className='diaryListButton' index={i} onClick={onClickList} key={v.update_time} props={v} />;
        })}
      </div>
    </>
  );
});

export default DiaryList;
