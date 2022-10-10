import React from 'react';
import axios from 'axios';
import ImageUploading from "react-images-uploading";
import ReactDOM from "react-dom";

export default function App() {

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };


  // onDrop(pictureFiles, pictureDataURLs) {
  //   this.setState({
  //     pictures: this.state.pictures.concat(pictureFiles)
  //   });
  //   console.log(pictureFiles[0]);
  //   const frm = new FormData();
  //   frm.append("images", pictureFiles[0]);
  //   axios
  // .post("/image", frm, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status == "files uploaded!") {
  //         window.alert("Image uploaded")
  //       } else {
  //         console.log(res.status)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       window.alert("게시물 작성에 실패했습니다.");
  //     });
  // }

  return (
    <div>
      <div className="App">

        {/* header */}
        <div className="header">
          <img alt="setting" src="settings.png" />

          <h1 style={{ textAlign: "center" }}>Sharpic</h1>
        </div>


        <div className="main">

          <div className="imagetitle">
            <img style={{ width: "3vw", height: "3vw", marginLeft: "30px", marginRight: "10px", float: "left" }} alt="book" src="book.png" />
            <img id="share" style={{ width: "1.5vw", height: "1.5vw", marginTop: "5px", marginLeft: "10px", float: "right" }} alt="friend" src="friend.png" />
            <img style={{ width: "1.5vw", height: "1.5vw", marginTop: "5px", marginLeft: "10px", marginRight: "10px", float: "right" }} alt="share" src="share.png" />
            <img style={{ width: "1.5vw", height: "1.5vw", marginTop: "5px", marginLeft: "10px", marginRight: "10px", float: "right" }} alt="menu" src="menu.png" />
            <img style={{ width: "1.5vw", height: "1.5vw", marginTop: "5px", marginLeft: "10px", marginRight: "10px", float: "right" }} alt="menu2" src="menu2.png" />

            <h1 style={{ marginLeft: "40px", marginTop: "20px" }}>Seoul Travel</h1>
          </div>

          <div className='imgmenu'>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
              acceptType={["jpg"]}
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
                <div className="upload__image-wrapper">
                  <button
                    style={isDragging ? { color: "red" } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </button>
                  &nbsp;
                  <button onClick={onImageRemoveAll}>Remove all images</button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.data_url} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>Update</button>
                        <button onClick={() => onImageRemove(index)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>


        </div>


        <div className="profile">
          <img alt="Profile" src="user.png" />
          <div>
            <h1>James</h1>
            <h4 style={{}}>example@gmail.com</h4>
          </div>
        </div>


        <div className="menu">
          <img alt="book" src="book.png" />
          <h2 >Seoul Travel</h2>
          <img alt="book" src="book2.png" />
          <h2>Tokyo Travel</h2>
          <img alt="book" src="book2.png" />
          <h2>Busan Travel</h2>
        </div>

      </div>
    </div>

  );
}

