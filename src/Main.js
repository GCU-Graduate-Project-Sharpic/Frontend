import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

import TopBar from './sub_module/main/TopBar';
import OffCanvas from './sub_module/main/OffCanvas';

import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import ProfileModal from './sub_module/modal/ProfileModal';

import ImageListBody from './sub_module/main/ImageListBody';
import AlbumNavigation from './sub_module/main/AlbumNavigation';
import ImageModal from './sub_module/modal/ImageModal';

export default function App() {

  const [show, setShow] = useState(false);
  const [imgSlider, setimgSlider] = useState(true);
  const [_src, setSrc] = useState();
  const [_src2, setSrc2] = useState();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const profileConfigurationHandler = (change) => {
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body');

    if (modal.classList.contains('show')) {
      modal.classList.remove('show');
      body.style.overflow = 'auto';
    } else {
      modal.classList.add('show');
      body.style.overflow = 'hidden';
    }

    if (change === true) {

      name = document.f.name.value;
      mail = document.f.mail.value;

      setMail(mail);
      setName(name);
      /** 
      axios.get(window.location.href + "api/user")
        .catch((err) => {
          if (err.response.status === 401) {
            window.location.replace("/login");
          }
        })
        .then((res) => {
          setName(res.data.name);
          setMail(res.data.mail);
        });
        */
    }
  }

  const [name, setName] = useState('Name');
  const [mail, setMail] = useState('Mail');
  const [album_name, setAlbumName] = useState('Album Name');

  const [albums, setAlbums] = React.useState([]);
  const [albumId, setAlbumId] = React.useState(1)

  const [images, setImages] = React.useState([]);
  const [imageIds, setImageIds] = React.useState([]);
  const maxNumber = 69;
  React.useEffect(() => {
    axios.get(window.location.href + "api/user")
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.replace("/login");
        }
      })
      .then((res) => {
        return axios.get(window.location.href + "api/album/list");
      })
      .then((res) => {
        return axios.get(window.location.href + "api/album/" + res.data.list[0]);
      })
      .then((res) => {
        // res.data = JSON.parse(res.data);
        if (res.data.imageIds != null) {
          setImageIds(res.data.imageIds);
        }
      });
  }, []);


  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    var ori_img_length = images.length;
    setImages(imageList);
    const frm = new FormData();
    for (var img of imageList.slice(ori_img_length)) {
      frm.append("images", img.file);
    }
    axios
      .post(window.location.href + "api/image/new/0/", frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        console.log(err);
        window.alert("Fail to upload image");
      })
      .then((res) => {
        if (res.status === "files uploaded!") {
          window.alert("Image uploaded")
          return axios.get(window.location.href + "api/album/list");
        } else {
          console.log(res.status)
        }
      })
      .then((res) => {
        return axios.get(window.location.href + "api/album/" + res.data.list[0]);
      })
      .then((res) => {
        // res.data = JSON.parse(res.data);
        if (res.data.imageIds != null) {
          setImageIds(res.data.imageIds);
        }
      });

  };

  return (
    <div className="App">
      {/* header */}
      <div className="bg-light border" style={{ flex: 'center' }}>
        {/** Header */}
        <TopBar handleShow={handleShow} profileConfigurationHandler={profileConfigurationHandler} />
      </div>

      <Stack direction="horizontal" gap={2} style={{ height: "100%", width: "100%" }}> {/** user profile */}

        <ProfileModal modalProfile={modalProfile} />
        {/** Add some margin */}

        <OffCanvas
          handleClose={handleClose}
          addAlbum={addAlbum}
          show={show}
          name={name}
          mail={mail}
        />


        <div style={{ width: '2000px', height: '850px' }}> {/** Main body */}

          {/** Add nav bar */}
          <AlbumNavigation album_name={album_name} handleShow={handleShow} />

          <Container fluid>

           

            <Row style={{ width: '100%' }}>

              {/* 여기에 ImageIds.map ...  */}
              {/* 여기에 ImageUploading */}
              <ImageListBody
                imageIds={imageIds}
                images={images}
                maxNumber={maxNumber}
                onChange={onChange}
                openModal={openModal}
              />


            </Row>

          </Container>
        </div>

      </Stack> {/** End of horizontal stack */}
      {/* 슬라이더 팝업 */}
      <style dangerouslySetInnerHTML={{ __html: "\n.modal2 {\nposition: absolute;\n z-index:5; top: 0;\n\n\nwidth: 100%;\nheight: 100%;\n\ndisplay: none;\n        background-color: rgba(0, 0, 0, 0.9);\n      }\n\n      .modal2.show {\n      display: block;\n      }\n\n      .modal2_body {\n        position: absolute;\n      \n  top: 50%;\n        left: 50%;\n\n        width: 1100px;\n        height: 800px;\n\n        padding: 40px;\n\n        text-align: center;\n\n        background-color: rgb(192, 192, 192);\n        border-radius: 10px;\n        box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);\n\n        transform: translateX(-50%) translateY(-50%);\n      }\n    " }} />
      <div className="modal2">
        <ImageModal imgSlider={imgSlider} _src={_src} _src2={_src2} setimgSlider={setimgSlider} openModal={openModal} isProcessed={isProcessed}/>
      </div>
    </div>
  );

  function isProcessed() {
    setimgSlider(!imgSlider);
  }

  function openModal(_src, _src2) {
    console.log("Button click");
    const modal2 = document.querySelector('.modal2');

    if (modal2.classList.contains('show')) {
      modal2.classList.remove('show');
    } else {
      modal2.classList.add('show');
    }

    setSrc(_src);
    setSrc2(_src2);
  }

  function modalProfile(change) {
    const modal = document.querySelector('.modal');
    const modal_body = document.querySelector('.modal_body');
    const body = document.querySelector('body');

    if (modal.classList.contains('show')) {
      modal.classList.remove('show');
      body.style.overflow = 'auto';
    } else {
      modal.classList.add('show');
      modal_body.classList.add('show');
    }

    if (change == true) {
      // get name and mail from html form 
      var name = document.f.name.value;
      var mail = document.f.mail.value;

      console.log(name);

      setMail(mail);
      setName(name);
    }

  }

  function addAlbum(current_list) {

    console.log(current_list);

    const list2 = document.querySelector('.list2');
    const list3 = document.querySelector('.list3');
    const list4 = document.querySelector('.list4');
    const list5 = document.querySelector('.list5');

    console.log(list2);

    if (current_list == 1) {
      list2.style.display = "block";
      current_list += 1;
    } else if (current_list == 2) {
      list3.style.display = "block";
      current_list += 1;
    }

    if (current_list == 2) {
      list2.style.display = "none";
      current_list -= 1;
    } else if (current_list == 3) {
      list3.style.display = "none";
      current_list -= 1;
    }
  }
}