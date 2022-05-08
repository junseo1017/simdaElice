import React, {useState, memo, useRef} from 'react';
import './diary.css';

const Dairy = memo(() => {
  const [diaryContent, setDiaryContent] = useState('');
  const diaryChange = (e) => {
    setDiaryContent(e.target.value);
    console.log(diaryContent);
  };
  return (
    <>
      <div className='paper'>
        <div className='paper-content'>
          <textarea onChange={diaryChange} defaultValue='일기를 입력해주세요 :)' autoFocus></textarea>
        </div>
        <button className='submitButton'>작성완료</button>
      </div>
    </>
  );
});

export default Dairy;
