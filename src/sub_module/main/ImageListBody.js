import React, { useEffect, useState } from 'react';
import ImageUploading from "react-images-uploading";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import "./ImageListBody.css";

function ImageListBody(props) {
  const [images, setImages] = React.useState([]);

  return (

    <div style={{ width: '100%' }} >
      {/* {props.imageIds.map((imageId, index) => (
        <div key={index + "-grid"} className="image" style={{ float: 'left', width: '70%' }}>
          <a href={window.location.origin + "/api/image/" + imageId} target="_blank" rel="noreferrer">
            <img src={window.location.origin + "/api/image/" + imageId} alt="" width="500" />
          </a>
        </div>
      ))} */}

      <ImageUploading
        multiple
        value={images}
        onChange={props.onChange}
        maxNumber={props.maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          // <div className="upload__image-wrapper">
          <Stack className="ImageList">
            <Button

              variant='primary'
              size='sm'
              onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </Button>
            <div >
              {/* {imageList.map((image, index) => (
                <div key={index} style={{ float: "left", margin: "20px" }}>
                  <img src={image.data_url} alt="" width="300" height="200" onClick={() => props.openModal(image.data_url, 'processing.png')} />
                  <img src='delete.png' style={{ width: "30px", height: "30px", position: "absolute" }} alt='close' z-index='3' onClick={() => onImageRemove(index)} />
                </div>
              ))} */}
              {props.imageIds.map((image, index) => image.info.status ?
                (
                  <div key={index} style={{ float: "left", margin: "20px" }}>
                    <img src={window.location.origin + "/api/image/processed/" + image.id} alt="" width="300" height="200" onClick={() => props.openModal(image)} />
                  </div>
                ) : (
                  <div key={index} style={{ float: "left", margin: "20px" }}>
                    <img src={window.location.origin + "/api/image/" + image.id} alt="" width="300" height="200" onClick={() => props.openModal(image)} />
                  </div>
                )
              )}
              {/* {imageIds.map((imageId, index) => (
                <div key={index} style={{ marginTop: '10px', float: "left", margin: "20px", marginRight: "25px" }}>                                    
                  <img src={window.location.origin + "/api/image/" + imageId} alt="" width="300" height="200" onClick={() => <ImageModal _src=(window.location.origin + "/api/image/" + imageId) _src2=(window.location.origin + "/api/image/processed/" + imageId)></ImageModal>/>
                  <img src='delete.png' style={{ width: "30px", height: "30px", position: "absolute" }} alt='close' z-index='3' onClick={() => onImageRemove(index)} />
                </div>
              ))} */}
            </div>
          </Stack>
        )}

      </ImageUploading>
    </div>
  );
}

export default ImageListBody;