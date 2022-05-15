import React, { useState, memo, useCallback, useRef } from "react";
import { Button } from "antd";
//import './layout/diarycontent.css';

const DiaryContent = memo((props) => {
  const diaryChange = (e) => {
    props.setDiaryContent(e.target.value);
  };
  const onSubmitBtn = () => {
    props.onClick();
  };

  return (
    <>
      <div className="paper">
        <div className="paper-content">
          <textarea
            onChange={diaryChange}
            placeholder="일기를 입력해주세요!"
            autoFocus
          ></textarea>
        </div>
        <Button onClick={onSubmitBtn} className="submitButton">
          작성완료
        </Button>
      </div>
    </>
  );
});

export default DiaryContent;
