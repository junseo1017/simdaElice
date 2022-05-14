
import React, { useState, memo } from "react";
import { Tabs, Calendar, Badge } from "antd";
import "antd/dist/antd.min.css";

import DiaryTopData from "./component/DiaryTopData.jsx";
import DairyContent from "./component/diarycontent.js";
import ImageUpload from "./component/ImageUpload.js";
import CalendarModal from "./component/CalendarModal.jsx";



const {TabPane} = Tabs;

const Diary = memo(() => {
    const [topData, setTopData] = useState({});
    const [clickTapOne, setClickTapOne] = useState(false);
    const wholeData = useMemo(() => requestData(), []);
    
    const onClickTap = (e) => {
        if (e === '1') {
            setClickTapOne(true);
        }
    }

    return (
        <>
            <Tabs tabPosition={'right'} >
                <TabPane tab="Calender" key="1">
                    <DiaryTopData setTopData={setTopData} />
                    <CalendarModal setclickValue={setClickTapOne} clickValue={clickTapOne}/>
                    <ImageUpload />
                    <DairyContent />
                </TabPane>
                <TabPane tab="Diary List" key="2">

                </TabPane>
                <TabPane tab="Set Up" key="3">

                </TabPane>
            </Tabs>
        </>
    )
})


export default Diary;
