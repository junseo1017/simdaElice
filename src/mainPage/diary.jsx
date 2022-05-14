import React, {useState, memo, useEffect, useRef} from 'react';
import {Tabs, Calendar, Badge} from 'antd';
import 'antd/dist/antd.min.css';
import DiaryTopData from './component/DiaryTopData.jsx';
import DiaryContent from './component/diarycontent.js';
import ImageUpload from './component/ImageUpload.js';
import CalendarModal from './component/CalendarModal.jsx';
import DiaryList from './component/diaryList.js';
import axios from 'axios';

const {TabPane} = Tabs;

function getListData(value) {
  let listData;
  // console.log(value.date());
  switch (value.date()) {
    default:
      break;
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  // console.log(listData);
  return (
    <ul className=''>
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div>
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

/*
      캘린더를 클릭하면 모달처럼 달력이 뜨거나 화면을 채워서 보여줌.
      캘린더 날짜를 클릭하면 해당 날짜 일기장을 화면에 보여줌
      Calendar API에서 onSelect 속성을 이용해서 구현예정
*/

const Diary = memo(() => {
  const [topData, setTopData] = useState({});
  const [clickTapOne, setClickTapOne] = useState(false);
  const [diaryContent, setDiaryContent] = useState('');
  const listData = useRef();

  //const wholeData = useMemo(() => requestData(), []);
  //return에           <ImageUpload /> 수정예정
  const onClickTap = (e) => {
    if (e === '1') {
      setClickTapOne(true);
    }
  };

  useEffect(() => {
    getDiaryList();
  }, [listData]);

  async function getDiaryList() {
    try {
      const res = await axios.get('http://14.35.100.207:3000/diarys/info');
      listData.current = res.data.diaryInfoList;
    } catch (err) {
      console.log(err);
    }
  }
  async function postMainPageSubmit() {
    // try {
    //   const res = await axios.post('http://14.35.100.207:3000/diarys/regist', {
    //     diary_seq:0,
    //     diary_reg_date: `${state.date[0]-${state.date[1]}-${state.date[2]}`,
    //     diary_weather_type: state.weather,
    //     diary_feel_type: state.emotion,
    //     diary_wakeup_time: '00:00:00',
    //     diary_sleep_time: '00:00:00',
    //     diary_content: diaryContent,
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
    console.log('send file');
  }
  const onClick = () => {
    postMainPageSubmit();
    console.log(listData.current);
    // 스테이트 초기화 시켜야함
  };
  return (
    <>
      <Tabs tabPosition={'right'}>
        <TabPane tab='Calender' key='1'>
          <DiaryTopData setTopData={setTopData} />
          <CalendarModal setclickValue={setClickTapOne} clickValue={clickTapOne} />
          <DiaryContent setDiaryContent={setDiaryContent} onClick={onClick} />
        </TabPane>
        <TabPane tab='Diary List' key='2'>
          <DiaryList listData={listData} />
        </TabPane>
        <TabPane tab='Set Up' key='3'></TabPane>
      </Tabs>
    </>
  );
});

export default Diary;
