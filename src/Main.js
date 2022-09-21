import React from 'react';
import axios from 'axios';
import ImageUploader from './component/index.js';

export default class Main extends React.PureComponent {
    constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
    });
    console.log(pictureFiles[0]);
    const frm = new FormData();
    frm.append("images", pictureFiles[0]);
    axios
	.post("/image", frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status == "files uploaded!") {
          window.alert("Image uploaded")
        } else {
          console.log(res.status)
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("게시물 작성에 실패했습니다.");
      });
  }


    render() {
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
                            <ImageUploader style={{ maxWidth: '800px', margin: "10px auto" }}
                                withPreview={true}
                                onChange={this.onDrop} />
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
}
