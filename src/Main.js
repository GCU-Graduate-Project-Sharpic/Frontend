import React, { useState } from 'react';
import axios from 'axios';

import TopBar from './sub_module/main/TopBar';
import OffCanvas from './sub_module/main/OffCanvas';

import Stack from 'react-bootstrap/Stack';
import "./Main.css";
import ProfileModal from './sub_module/modal/ProfileModal';
import ImageListBody from './sub_module/main/ImageListBody';
import AlbumNavigation from './sub_module/main/AlbumNavigation';
import SideBar from './sub_module/main/SideBar';

export default function App() {
  const [appShow, setAppShow] = useState(false);

  const [profileShow, setProfileShow] = useState(false);
  const [offcanvasShow, setOffcanvasShow] = useState(false);

  const [name, setName] = useState('Name');
  const [email, setEmail] = useState('Email');

  const handleOffcanvasShow = () => setOffcanvasShow(!offcanvasShow);

  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [albumList, setAlbumList] = React.useState([])

  const [imageIds, setImageIds] = React.useState([]);
  const maxNumber = 69;

  React.useEffect(() => {
    axios.get(window.location.origin + "/api/user")
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.replace("/login");
        }
      })
      .then((res) => {
        setName(res.data.username);
        setEmail(res.data.email);
        return axios.get(window.location.origin + "/api/album/list");
      })
      .then((res) => {
        setAlbumList(res.data.albumList)
        if (currentAlbum === null) {
          setCurrentAlbum(res.data.albumList[0]);
          if (res.data.albumList[0].imageIds != null) {
            setImageIds(res.data.albumList[0].imageIds)
          }
          setAppShow(true);
        } else {
          const album = res.data.albumList.find((album) => album.id === currentAlbum.id)
          setCurrentAlbum(album)
          setImageIds(album.imageIds);
          setAppShow(true);
        }
      });
  }, []);

  const inOffCanvas = false;

  const onChange = (imageList) => {
    // data for submit
    const frm = new FormData();
    for (var img of imageList) {
      frm.append("images", img.file);
    }
    let url = window.location.origin + "/api/image/new/";
    if (currentAlbum.id === albumList[0].id) {
      url = url + "0";
    } else {
      url = url + currentAlbum.id;
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
        if (res.data.status === "images uploaded!") {
          window.alert("Image uploaded")
          return axios.get(window.location.origin + "/api/album/list");
        } else {
          console.log(res.status)
        }
      })
      .then((res) => {
        setAlbumList(res.data.albumList)
        const album = res.data.albumList.find((album) => album.id === currentAlbum.id)
        setCurrentAlbum(album)
        setImageIds(album.imageIds);
      });
  };

  return (
    appShow &&
    <div className="App">
      {/* header */}
      <div className="bg-lightBorder" >
        {/** Header */}
        <TopBar handleOffcanvasShow={handleOffcanvasShow} modalProfile={modalProfile} />
      </div>

      {/** Add some margin */}

      <OffCanvas
        handleOffcanvasShow={handleOffcanvasShow}
        currentAlbum={currentAlbum}
        albumList={albumList}
        setCurrentAlbum={setCurrentAlbum}
        setAlbumList={setAlbumList}
        setImageIds={setImageIds}
        offcanvasShow={offcanvasShow}
        name={name}
        email={email}
      />


      <Stack direction="vertical" gap={1} style={{ height: "100%", maxWidth: "100%" }}> {/** user profile */}

        <div> {/** Main body */}

          {/** Add nav bar */}
          <AlbumNavigation albumTitle={currentAlbum.title} handleOffcanvasShow={handleOffcanvasShow} />

          <div direction="horizontal">

            <div className="SideBar">
              <SideBar
                inOffCanvas={inOffCanvas}
                currentAlbum={currentAlbum}
                albumList={albumList}
                setCurrentAlbum={setCurrentAlbum}
                setAlbumList={setAlbumList}
                setImageIds={setImageIds}
                name={name}
                email={email}
              />
            </div>


            {/* Align each items into center */}

            <div className="d-lg-none" >
              <ImageListBody
                imageIds={imageIds}
                maxNumber={maxNumber}
                onChange={onChange}
              />
            </div>

            <div className="d-none d-lg-block" style={{ width: '79%', float: 'right' }}>
              <ImageListBody
                imageIds={imageIds}
                maxNumber={maxNumber}
                onChange={onChange}
              />
            </div>

          </div>

        </div>

      </Stack> {/** End of horizontal stack */}
      {/* 슬라이더 팝업 */}

      {
        profileShow &&
        <ProfileModal modalProfile={modalProfile} />
      }
      
    </div>
  );


  function modalProfile(change, newName, newEmail) {
    // const modal = document.querySelector('.modal');
    // const modal_body = document.querySelector('.modal_body');
    const body = document.querySelector('body');

    // if (modal.classList.contains('show')) {
    //   modal.classList.remove('show');
    //   body.style.overflow = 'auto';
    // } else {
    //   modal.classList.add('show');
    //   modal_body.classList.add('show');
    // }

    if (profileShow) {
      console.log("profile close");
      setProfileShow(false);
      body.style.overflow = 'auto';
    } else {
      console.log("profile open");
      setProfileShow(true);
      body.style.overflow = 'hidden';
    }

    if (change == true) {
      // get name and mail from html form 

      console.log(name);

      setEmail(newEmail);
      setName(newName);
    }
  }
}