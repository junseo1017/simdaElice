import React, {memo} from 'react';

import './layout/diarycontent.css';

const DiaryContent = memo((props) => {
  const diaryChange = (e) => {
    props.setDiaryContent(e.target.value);
  };
  const onSubmitBtn = () => {
    props.onClick();
  };

  return (
    <>
      <div className='paper'>
        <div className='paper-content'>
          <textarea onChange={diaryChange} placeholder='일기를 입력해주세요!' autoFocus></textarea>
        </div>
        <button onClick={onSubmitBtn} className='submitButton'>
          작성완료
        </button>
      </div>
    </>
  );
});

export default DiaryContent;
