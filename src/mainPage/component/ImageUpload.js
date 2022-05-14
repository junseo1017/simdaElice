import ImageUploading from "react-images-uploading";
import "./layout/ImageUpload.css";

const ImageUpload = ({images, onUploadImage}) => {
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    onUploadImage(imageList);
  };
  const onError = (errors, files) => {
    if (errors.maxNumber) {
      alert("사진은 1개만 첨부할 수 있습니다");
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
            {images.length === 0 && (
              <button
                style={isDragging ? {color: "red"} : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                사진 등록
              </button>
            )}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>
                    사진 변경
                  </button>
                  <button onClick={() => onImageRemove(index)}>삭제</button>
                </div>
                <img src={image.data_url} alt="" height="400" />
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </>
  );
};

export default ImageUpload;
