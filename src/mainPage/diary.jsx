import React, {useState, memo, useEffect, useCallback, useRef} from 'react';
import {Tabs} from 'antd';
import 'antd/dist/antd.min.css';
import DiaryTopData from './component/DiaryTopData.jsx';
import DairyContent from './component/diarycontent.js';
import ImageUpload from './component/ImageUpload.js';
import CalendarModal from './component/CalendarModal.jsx';
import DiaryList from './component/diaryList.js';
import axios from 'axios';
import './component/layout/diary.css';

const {TabPane} = Tabs;

const Diary = memo(() => {
  const [topData, setTopData] = useState({});
  const [clickModal, setclickModal] = useState(false);
  const [currentTap, setCurrentTap] = useState({cur: '1', prev: ''});
  // ImageUpload에 props로 보낼 state와 setState
  const [images, setImages] = useState([]);
//   const [clickTapOne, setClickTapOne] = useState(false);
  const [diaryContent, setDiaryContent] = useState('');

  const listData = useRef();

  
    //const wholeData = useMemo(() => requestData(), []);
    //return에           <ImageUpload /> 수정예정
    const onClickTap = (e) => {
        if (e === '2') {
            setclickModal(true);
            setCurrentTap((prev) => ({...prev, cur: e, prev: prev.cur}));
        } else {
            setCurrentTap((prev) => ({...prev, cur: e}));
        }
    };

    
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
  });

  async function postMainPageSubmit() {
    try {
      const res = await axios.post('http://14.35.100.207:3000/diarys/info/regist', {
        user_seq: 17,
        diary_seq: 5,
        diary_reg_date: `${topData.date[0]}-${topData.date[1]}-${topData.date[2]}`,
        diary_weather_type: topData.weather,
        diary_feel_type: topData.emotion,
        diary_content: diaryContent,
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDiaryList();
  }, [listData]);

  const onClick = () => {
    if (window.confirm('저장하시겠습니까?')) {
      postMainPageSubmit();
      console.log(listData.current);
      window.location.reload();
    }
  };

    
    return (
        <>
            <Tabs tabPosition={'right'} onTabClick={onClickTap} activeKey={currentTap.cur}>
                <TabPane tab='Diary' key='1'>
                    <DiaryTopData setTopData={setTopData} />
                    <ImageUpload images={images} onUploadImage={setImages} />
                    <DairyContent setDiaryContent={setDiaryContent} onClick={onClick} />
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
