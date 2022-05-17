import { memo, useState, useEffect, useMemo } from "react";
import { Modal, Calendar, Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun, faCloud, faWind, faCloudShowersHeavy, faCloudBolt, faSnowflake,
    faFaceSmileBeam, faFaceLaughSquint, faFaceSadCry, faFaceTired, faFaceKiss, faFaceAngry
} from '@fortawesome/free-solid-svg-icons';

const emotionArray = [faFaceSadCry, faFaceKiss, faFaceSmileBeam, faFaceLaughSquint, faFaceAngry, faFaceTired];
const weatherArray = [faSun, faCloud, faCloudShowersHeavy, faCloudBolt, faWind, faSnowflake];



const CalendarModal = memo(({ setclickModal, clickModal, setCurrentTap, getDiaryList }) => {

    const serverDataList = useMemo(() => getDiaryList(), []);
    const [serverData, setServerData] = useState([]);

    // 서버에 있는 데이터 가져오기 (pending이 일어나며 발생, fulfill 일어나며 실행되서 두 번 발생)
    useEffect(() => {
        serverDataList.then(res => {
            res.map((data) => {
                const temp = {
                    date: data.diary_reg_date,
                    weather: data.diary_weather_type,
                    emotion: data.diary_feel_type,
                };
                setServerData((prev) => [...prev, temp]);
            });
        })
    }, [serverDataList])

/*

    // 렌더링 횟수 확인용
    console.log(serverData, serverDataList);
    console.log('확인');

*/


    function getListData(value) {
        const getData = serverData.find((data) => {
            return data.date.substring(0, 10) ===
                value.utc().format('YYYY-MM-DD')
        })
        return getData || {};
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            Object.keys(listData).length ?
                <ul>
                    <li>
                        <FontAwesomeIcon icon={weatherArray[listData.weather]} />
                    </li>
                    <li>
                        <FontAwesomeIcon icon={emotionArray[listData.emotion]} />
                    </li>
                </ul >
                : <></>
        );
    }

    const handleCancel = () => {
        setclickModal(false);
        setCurrentTap((prev) => ({...prev, cur: prev.prev}));
    }


    const handleOK = (e) => {

    }

    const SelectDate = (e) => {
    }

    return (
        <>
            <Modal visible={clickModal} onCancel={handleCancel} onOk={handleOK} >
                <Calendar mode="month" locale={'locale'} dateCellRender={dateCellRender} onSelect={SelectDate} style={ {backgroundColor: '#9575cd'}} />
            </Modal>
        </>
    )
})


export default CalendarModal;