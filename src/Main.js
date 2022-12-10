import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TopBar from './sub_module/main/TopBar';
import OffCanvas from './sub_module/main/OffCanvas';

import Stack from 'react-bootstrap/Stack';

import ProfileModal from './sub_module/modal/ProfileModal';
import ImageListBody from './sub_module/main/ImageListBody';
import AlbumNavigation from './sub_module/main/AlbumNavigation';
import ImageModal from './sub_module/modal/ImageModal';
import SideBar from './sub_module/main/SideBar';

export default function App() {

  const [show, setShow] = useState(false);

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

  const getImageInfos = async (imageIds) => {
    let imageList = [];
    for (let imageId of imageIds) {
      await axios.get(window.location.href + "api/image/info/" + imageId)
        .then((res) => {
          imageList.push({
            id: imageId,
            info: res.data
          })
        })
      console.log("Inner for")
    }
    console.log("outer for")
    setImageIds(imageList);
  }

  const [name, setName] = useState('Name');
  const [mail, setMail] = useState('Mail');
  const [album_name, setAlbumName] = useState('Album Name');

  const [albumId, setAlbumId] = useState(0);
  const [albumIds, setAlbumIds] = React.useState([])

  const [albums, setAlbums] = React.useState([]);

  const [modalImage, setModalImage] = React.useState();
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
        setAlbumIds(res.data.list);
        if (albumId === 0) {
          setAlbumId(res.data.list[0])
          return axios.get(window.location.href + "api/album/" + res.data.list[0]);
        }
        return axios.get(window.location.href + "api/album/" + albumId);
      })
      .then((res) => {
        // res.data = JSON.parse(res.data);
        if (res.data.imageIds != null) {
          getImageInfos(res.data.imageIds);
        }
      });
  }, []);

  const inOffCanvas = false;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    const frm = new FormData();
    for (var img of imageList) {
      frm.append("images", img.file);
    }
    let url = window.location.href + "api/image/new/";
    if (albumId === albumIds[0]) {
      url = url + "0";
    } else {
      url = url + albumId;
    }
    axios
      .post(url, frm, {
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
          return axios.get(window.location.href + "api/album/" + albumId);
        } else {
          console.log(res.status)
        }
      })
      .then((res) => {
        // res.data = JSON.parse(res.data);
        if (res.data.imageIds != null) {
          getImageInfos(res.data.imageIds);
        }
      });

  };

  return (
    <div className="App" style={{ width: '100%' }}>
      {/* header */}
      <div className="bg-light border" style={{ flex: 'center', width: '100%' }}>
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

            <div style={{ height: '100%', width: '20%' }}>
              <SideBar
                inOffCanvas={inOffCanvas}
                handleClose={handleClose}
                addAlbum={addAlbum}
                show={show}
                name={name}
                mail={mail}
              />
            </div>

            <div style={{ width: '79%', float: 'right' }}>

              <ImageListBody
                imageIds={imageIds}
                maxNumber={maxNumber}
                onChange={onChange}
                openModal={openModal}
              />

            </div>

          </div>

        </div>

      </Stack> {/** End of horizontal stack */}
      {/* 슬라이더 팝업 */}

      <style dangerouslySetInnerHTML={{ __html: "\n.modal2 {\nposition: absolute;\n z-index:5; top: 0;\n\n\nwidth: 100%; height: 100%;\n\ndisplay: none;\n       \n      }\n\n      .modal2.show {\n      display: block;\n      }\n\n      .modal2_body {\n        position: absolute;\n      \n  top: 50%;\n        left: 50%;\n\n        width: 1100px;\n        height: 100%;\n\n        padding: 40px;\n\n        text-align: center;\n\n        background-color: rgb(192, 192, 192);\n        border-radius: 10px;\n        box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);\n\n        transform: translateX(-50%) translateY(-50%);\n      }\n    " }} />
      <div className="modal2" style={{ height: '100%' }}>
        {
          modalImage ? (
            <ImageModal image={modalImage} openModal={openModal} isProcessed={isProcessed} />
          ) : (
            <div>
            </div>
          )
        }
      </div>
    </div>
  );

  function isProcessed() {
  }

  function openModal(image) {

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

    setModalImage(image);
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