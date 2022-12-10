import React, { useState } from 'react';
import axios from 'axios';

import TopBar from './sub_module/main/TopBar';
import OffCanvas from './sub_module/main/OffCanvas';

import Stack from 'react-bootstrap/Stack';
import "./Main.css";
import ProfileModal from './sub_module/modal/ProfileModal';
import ImageListBody from './sub_module/main/ImageListBody';
import AlbumNavigation from './sub_module/main/AlbumNavigation';
import ImageModal from './sub_module/modal/ImageModal';
import SideBar from './sub_module/main/SideBar';

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

      setMail(document.f.mail.value);
      setName(document.f.name.value);
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

  const inOffCanvas = false;

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
      <div className="bg-lightBorder" >
        {/** Header */}
        <TopBar handleShow={handleShow} profileConfigurationHandler={profileConfigurationHandler} />
      </div>

      <ProfileModal modalProfile={modalProfile} />
      {/** Add some margin */}

      <OffCanvas
        handleClose={handleClose}
        addAlbum={addAlbum}
        show={show}
        name={name}
        mail={mail}
      />


      <Stack direction="vertical" gap={1} style={{ height: "100%", maxWidth: "100%" }}> {/** user profile */}

        <div> {/** Main body */}

          {/** Add nav bar */}
          <AlbumNavigation album_name={album_name} handleShow={handleShow} />

          <div direction="horizontal">

            <div className="SideBar">
              <SideBar
                inOffCanvas={inOffCanvas}
                handleClose={handleClose}
                addAlbum={addAlbum}
                show={show}
                name={name}
                mail={mail}
              />
            </div>


            {/* Align each items into center */}

            <div className="d-lg-none" >
              <ImageListBody
                imageIds={imageIds}
                images={images}
                maxNumber={maxNumber}
                onChange={onChange}
                openModal={openModal}
              />
            </div>

            <div className="d-none d-lg-block" style={{ width: '79%', float: 'right' }}>
              <ImageListBody
                imageIds={imageIds}
                images={images}
                maxNumber={maxNumber}
                onChange={onChange}
                openModal={openModal}
              />
            </div>

          </div>

        </div>

      </Stack> {/** End of horizontal stack */}
      {/* 슬라이더 팝업 */}

      <div className="modal2">
        <ImageModal imgSlider={imgSlider} _src={_src} _src2={_src2} setimgSlider={setimgSlider} openModal={openModal} isProcessed={isProcessed} />
      </div>
    </div>
  );

  function isProcessed() {
    setimgSlider(!imgSlider);
  }

  function openModal(_src, _src2) {

    // disable scroll when modal is open
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    console.log("Button click");
    const modal2 = document.querySelector('.modal2');

    if (modal2.classList.contains('show')) {
      modal2.classList.remove('show');
      body.style.overflow = 'auto';
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