import ImageUploading from "react-images-uploading";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';


function ImageListBody(props) {

    return (

        <div>
            {props.imageIds.map((imageId, index) => (
                    <div key={index + "-grid"} className="image" style={{ float: 'left', width: '100%' }}>
                      <a href={window.location.href + "api/image/" + imageId} target="_blank" rel="noreferrer">
                        <img src={window.location.href + "api/image/" + imageId} alt="" width="500" />
                      </a>
                    </div>
                  ))}

            <ImageUploading
                multiple
                value={props.images}
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

                    <Stack style={{ marginTop: '10px', width: '100%', position: "relative", alignItems: "center", float: "left" }}>



                        <Button variant='primary' size='sm' onClick={onImageUpload} {...dragProps}>
                            Click or Drop here
                        </Button>

                        &nbsp;
                        <Button variant='danger' size='sm' onClick={onImageRemoveAll} >Remove all images</Button>
                        <div>
                            {imageList.map((image, index) => (
                                <div key={index} style={{ marginTop: '10px', float: "left", margin: "20px", marginRight: "25px" }}>
                                    <img src={image.data_url} alt="" width="300" height="200" onClick={() => props.openModal(image.data_url, 'processing.png')} />
                                    <img src='delete.png' style={{ width: "30px", height: "30px", position: "absolute" }} alt='close' z-index='3' onClick={() => onImageRemove(index)} />
                                </div>
                            ))}
                            {props.imageIds.map((imageId, index) => (
                                <div key={index} style={{ marginTop: '10px', float: "left", margin: "20px", marginRight: "25px" }}>
                                    <img src={window.location.href + "api/image/" + imageId} alt="" width="300" height="200" onClick={() => props.openModal(window.location.href + "api/image/" + imageId, window.location.href + "api/image/processed/" + imageId)} />
                                    <img src='delete.png' style={{ width: "30px", height: "30px", position: "absolute" }} alt='close' z-index='3' onClick={() => onImageRemove(index)} />
                                </div>
                            ))}
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