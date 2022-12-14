import ImageModal from '../modal/ImageModal';
import React, { useEffect, useState } from 'react';
import ImageUploading from "react-images-uploading";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import "./ImageListBody.css";

function ImageListBody(props) {
  const [images, setImages] = React.useState([]);
  const [imageInfos, setImageInfos] = React.useState([]);
  const [modalImageId, setModalImageId] = React.useState(null);

  const getImageInfos = async () => {
    let newImageInfos = [];
    for (let imageId of props.imageIds) {
      await axios.get(window.location.origin + "/api/image/info/" + imageId)
        .then((res) => {
          newImageInfos.push({
            id: imageId,
            info: res.data
          })
        })
    }
    setImageInfos(newImageInfos);
  }

  React.useEffect(() => {
    getImageInfos();
  }, [props.imageIds])

  return (
    <div style={{ width: '100%' }} >
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

            <div style={{ marginLeft: '4px' }}>
              {imageInfos.map((image, index) => image.info.status ?
                (
                  <div key={index} id="imageMargin" >
                    <Card id="imageView">
                      <Card.Img id="imageCSSBig" variant="top" src={window.location.origin + "/api/image/processed/" + image.id + "?temp=" + Math.random().toString(36).substring(2, 12)} alt="" onClick={() => openModal(image)} />
                    </Card>
                  </div>
                ) : (
                  <div key={index} id="imageMargin" >
                    <Card id="imageView">
                      <Card.Img id="imageCSSBig" variant="top" src={window.location.origin + "/api/image/" + image.id} alt="" onClick={() => openModal(image)} />
                    </Card>
                  </div>
                )
              )}
            </div>
          </Stack>
        )}

      </ImageUploading>
      {
        modalImageId != null && (
          <ImageModal imageId={modalImageId} getImageInfos={getImageInfos} openModal={openModal} />
        )
      }
    </div>
  );

  function openModal(image) {
    console.log("Button click");

    const body = document.querySelector('body');
    if (modalImageId != null) {
      setModalImageId(null);
      body.style.overflow = 'auto';
    } else {
      setModalImageId(image.id);
      body.style.overflow = 'hidden';
    }
  }
}

export default ImageListBody;