import { useState } from "react";
import ImageUploading from "react-images-uploading";

import "./layout/ImageUpload.css";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 2;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const onError = (errors, files) => {
    if (errors.maxNumber) {
      alert("이미지는 2개까지만 첨부할 수 있습니다");
    }
  };
  return (
    <>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        onError={onError}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              이미지 등록
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>이미지 전체 삭제</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="400" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>변경</button>
                  <button onClick={() => onImageRemove(index)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </>
  );
};

export default ImageUpload;
