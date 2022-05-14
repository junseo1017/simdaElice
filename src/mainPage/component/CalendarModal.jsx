import { memo } from "react";
import { Modal, Calendar, Badge } from "antd";
import axios from "axios";





const CalendarModal = memo(({ setclickValue, clickValue }) => {


    const handleCancel = () => {
        setclickValue(false);
    }

    const handleOK = (e) => {
    }

    function getListData(value) {

        // 서버에 value.date()같은 날짜 데이터를 보내서  
        // 데이터를 받아온 상황 가정

        const [date, weather, emotion] = ['2022-5-4', 2, 3];
        let listData;
        listData = [
            { type: 'success', data: date },
            { type: 'warning', data: weather },
            { type: 'error', data: emotion },
        ];
        return listData || [];
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <ul>
                {listData.map(item => (
                    <li key={item.data + item.type}>
                        <Badge status={item.type} text={item.data} />
                    </li>
                ))}
            </ul>
        );
    }

    const SelectDate = (e) => {
    }

    return (
        <>
            <Modal visible={clickValue} onCancel={handleCancel} onOk={handleOK} >
                <Calendar mode="month" dateCellRender={dateCellRender} onSelect={SelectDate}  />
            </Modal>
        </>
    )
})


export default CalendarModal;