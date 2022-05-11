import React, { useState, useRef } from "react";
import { Tabs, Calendar, Badge } from "antd";
import "antd/dist/antd.min.css";

import DiaryTopData from "./component/DiaryTopData.jsx";
import DairyContent from "./component/diarycontent.js";
import ImageUpload from "./component/ImageUpload.js";

const { TabPane } = Tabs;

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
    <ul className="">
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

const Diary = () => {
  const [clickPage, setClickPage] = useState(false);

  const onChangePage = (e) => {
    console.log(e);
    setClickPage((prev) => !prev);
  };

  return (
    <>
      <Tabs tabPosition={"right"} onTabClick={onChangePage}>
        <TabPane tab="Calender" key="1">
          {clickPage ? (
            <DiaryTopData />
          ) : (
            <Calendar
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
              onSelect={onChangePage}
            />
          )}
          <ImageUpload />
          <DairyContent />
        </TabPane>

        <TabPane tab="Diary List" key="2"></TabPane>
        <TabPane tab="Set Up" key="3"></TabPane>
      </Tabs>
    </>
  );
};

export default Diary;
