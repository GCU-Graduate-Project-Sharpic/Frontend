import React, { useEffect, useState } from 'react';
import ImageUploading from "react-images-uploading";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';


function ImageListBody(props) {
  const [images, setImages] = React.useState([]);

  return (

    <div style={{ width: '100%' }} >
      {/* {props.imageIds.map((imageId, index) => (
        <div key={index + "-grid"} className="image" style={{ float: 'left', width: '70%' }}>
          <a href={window.location.href + "api/image/" + imageId} target="_blank" rel="noreferrer">
            <img src={window.location.href + "api/image/" + imageId} alt="" width="500" />
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

          <Stack style={{ marginTop: '10px', width: '80vw', height: '50vw', position: "relative", float: "left" }}>

            {/* Align button into center */}
            {/*}
                        <div style={{ width: '100%', height: '100%', position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                        <Button
                            style={{ width: '200px', marginTop: '5px', marginLeft: '45px' }}
                            variant='primary'
                            size='sm'
                            onClick={onImageUpload} {...dragProps}>
                            Click or Drop here
                        </Button>
                </div> */}

            <Button
              style={{ width: '200px', marginTop: '5px', marginLeft: '45px' }}
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
                      <img src={window.location.href + "api/image/processed/" + image.id} alt="" width="300" height="200" onClick={() => props.openModal(image)} />
                      <img src='delete.png' style={{ width: "30px", height: "30px", position: "absolute" }} alt='close' z-index='3' onClick={() => onImageRemove(index)} />
                    </div>
                  ) : (
                    <div key={index} style={{ float: "left", margin: "20px" }}>
                      <img src={window.location.href + "api/image/" + image.id} alt="" width="300" height="200" onClick={() => props.openModal(image)} />
                      <img src='delete.png' style={{ width: "30px", height: "30px", position: "absolute" }} alt='close' z-index='3' onClick={() => onImageRemove(index)} />
                    </div>
                  )
                
              )}
              {/* {imageIds.map((imageId, index) => (
                                  <div key={index} style={{ marginTop: '10px', float: "left", margin: "20px", marginRight: "25px" }}>                                    
                                    <img src={window.location.href + "api/image/" + imageId} alt="" width="300" height="200" onClick={() => <ImageModal _src=(window.location.href + "api/image/" + imageId) _src2=(window.location.href + "api/image/processed/" + imageId)></ImageModal>/>
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