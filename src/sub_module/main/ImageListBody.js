import React, { useEffect, useState } from 'react';
import ImageUploading from "react-images-uploading";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
          <Stack id="stackSize" className="ImageList">
            <Button
              id="uploadButton"
              variant='primary'
              size='sm'
              onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </Button> 

            <div style={{marginLeft: '4px'}}>
              {props.imageIds.map((image, index) => image.info.status ?
                (
                  <div key={index} id="imageMargin" >

                    <Card id="imageView">

                      {
                        props.small ? (
                          <Card.Img id="imageCSSmall" variant="top" src={window.location.origin + "/api/image/processed/" + image.id} alt="" onClick={() => props.openModal(image)} />
                        ) : (
                          <Card.Img id="imageCSSBig" variant="top" src={window.location.origin + "/api/image/processed/" + image.id} alt="" onClick={() => props.openModal(image)} />
                        )
                      }
                    </Card>
                  </div>
                ) : (
                  <div key={index} id="imageMargin" >
                    <Card id="imageView">
                    {
                        props.small ? (
                          <Card.Img id="imageCSSmall" variant="top" src={window.location.origin + "/api/image/" + image.id} alt="" onClick={() => props.openModal(image)} />
                        ) : (
                          <Card.Img id="imageCSSBig" variant="top" src={window.location.origin + "/api/image/" + image.id} alt="" onClick={() => props.openModal(image)} />
                        )
                      }
                    </Card>
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

function changeStat(props) {
  console.log("changeStat");
  props.setSmall(!props.small);
}

export default ImageListBody;