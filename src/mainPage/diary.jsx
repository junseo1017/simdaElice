import React, { useState, memo, useEffect, useRef } from "react";
import axios from "axios";
import { Tabs, Calendar, Badge } from "antd";
import "antd/dist/antd.min.css";

import DiaryTopData from "./component/DiaryTopData.jsx";
import DairyContent from "./component/diarycontent.js";
import ImageUpload from "./component/ImageUpload.js";
import CalendarModal from "./component/CalendarModal.jsx";
import DiaryList from "./component/diaryList.js";
import "./component/layout/diary.css";

const { TabPane } = Tabs;

const Diary = memo(() => {
  const [topData, setTopData] = useState({});
  // ImageUpload에 props로 보낼 state와 setState
  const [images, setImages] = useState([]);
  const [clickTapOne, setClickTapOne] = useState(false);
  const [diaryContent, setDiaryContent] = useState("");
  const listData = useRef();

  //const wholeData = useMemo(() => requestData(), []);
  //return에           <ImageUpload /> 수정예정
  const onClickTap = (e) => {
    if (e === "1") {
      setClickTapOne(true);
    }
  };

  useEffect(() => {
    getDiaryList();
  }, [listData]);

  async function getDiaryList() {
    try {
      const res = await axios.get("http://14.35.100.207:3000/diarys/info");
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
  }
  const onClick = () => {
    if (window.confirm("저장하시겠습니까?")) {
      postMainPageSubmit();
      console.log(listData.current);
      window.location.reload();
    }
  };
  return (
    <>
      <Tabs tabPosition={"right"} onTabClick={onClickTap}>
        <TabPane tab="Calender" key="1">
          <DiaryTopData setTopData={setTopData} />
          <CalendarModal
            setclickValue={setClickTapOne}
            clickValue={clickTapOne}
          />
          <ImageUpload images={images} onUploadImage={setImages} />
          <CalendarModal
            setclickValue={setClickTapOne}
            clickValue={clickTapOne}
          />
          <DairyContent onClick={onClick} />
        </TabPane>
        <TabPane tab="Diary List" key="2">
          <DiaryList listData={listData} />
        </TabPane>
        <TabPane tab="Set Up" key="3"></TabPane>
      </Tabs>
    </>
  );
});

export default Diary;
