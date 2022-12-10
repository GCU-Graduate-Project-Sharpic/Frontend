import ImageUploading from "react-images-uploading";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import "./ImageListBody.css";

function ImageListBody(props) {

    return (

        <div style={{ width: '100%' }} >
            {props.imageIds.map((imageId, index) => (
                <div key={index + "-grid"} className="image" >
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

                    <Stack className="ImageList">

                      

                        <Button
                        
                            variant='primary'
                            size='sm'
                            onClick={onImageUpload} {...dragProps}>
                            Click or Drop here
                        </Button>

            

                        <div >
                            {imageList.map((image, index) => (
                                <div className="ListBody" key={index} >
                                    <img src={image.data_url} alt="" width="300" height="200" onClick={() => props.openModal(image.data_url, 'processing.png')} />
                                    <img className="delete" src='delete.png'  alt='close' z-index='3' onClick={() => onImageRemove(index)} />
                                </div>
                            ))}
                            {props.imageIds.map((imageId, index) => (
                                <div className="ListBody" key={index} >
                                    <img src={window.location.href + "api/image/" + imageId} alt="" width="300" height="200" onClick={() => props.openModal(window.location.href + "api/image/" + imageId, window.location.href + "api/image/processed/" + imageId)} />
                                    <img className="delete" src='delete.png'  alt='close' z-index='3' onClick={() => onImageRemove(index)} />
                                </div>
                            ))}
                        </div>
                    </Stack>
                )}

            </ImageUploading>
        </div>
    );
}

export default ImageListBody;