
import React, { useState, memo, useEffect, useCallback, useRef } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.min.css';
import DiaryTopData from './component/DiaryTopData.jsx';
import DairyContent from './component/diarycontent.js';
import ImageUpload from './component/ImageUpload.js';
import CalendarModal from './component/CalendarModal.jsx';
import DiaryList from './component/diaryList.js';
import axios from 'axios';
import "./component/layout/diary.css";

const { TabPane } = Tabs;


const Diary = memo(() => {

  const [topData, setTopData] = useState({});
  const [clickModal, setclickModal] = useState(false);
  const [currentTap, setCurrentTap] = useState('1');
  // ImageUpload에 props로 보낼 state와 setState
  const [images, setImages] = useState([]);
  const [clickTapOne, setClickTapOne] = useState(false);
  const [diaryContent, setDiaryContent] = useState('');


  const listData = useRef();

    //const wholeData = useMemo(() => requestData(), []);
    //return에           <ImageUpload /> 수정예정
    const onClickTap = (e) => {
        if (e === '2') {
            setclickModal(true);
        }
        setCurrentTap(e);
    };

    useEffect(() => {
        getDiaryList();
    }, [listData]);

  
    const getDiaryList = useCallback(async () => {
        try {
            const res = await axios.get('http://14.35.100.207:3000/diarys/info');
            const getData = res.data.diaryInfoList;
            listData.current = getData;
            return getData;
        } catch (err) {
            console.log(err);
        }
    })
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

  useEffect(() => {
    getDiaryList();
  }, [listData]);

  
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
    //     diary_img:image[0].data_url,
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
    console.log('send file');
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
            <Tabs tabPosition={'right'} onTabClick={onClickTap} activeKey={currentTap}>
                <TabPane tab='Diary' key='1'>
                    <DiaryTopData setTopData={setTopData} />
                    <ImageUpload images={images} onUploadImage={setImages} />
                    <DiaryContent setDiaryContent={setDiaryContent} onClick={onClick} />
                </TabPane>
                <TabPane tab='Calender' key='2'>
                    <CalendarModal setclickModal={setclickModal} clickModal={clickModal} setCurrentTap={setCurrentTap} getDiaryList={getDiaryList} />
                </TabPane>
                <TabPane tab='Diary List' key='3'>
                    <DiaryList listData={listData} />
                </TabPane>
            </Tabs>
        </>
    );
});

export default Diary;
