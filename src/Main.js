import React, { useState } from 'react';
import axios from 'axios';
import ImageUploading from "react-images-uploading";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import * as ReactDOM from 'react-dom/client';

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import Row from 'react-bootstrap/Row';

import Stack from 'react-bootstrap/Stack';
// import React, { useEffect, useState } from 'react';

export default function App() {


  /**
   * Radio buttons 
   */
  const [radioValue, setRadioValue] = useState('0');


  const radios = [
    { name: 'Default', value: '-1' },
    { name: 'SR', value: '0' },
    { name: 'Restoration - wo scratches', value: '1' },
    { name: 'Restoration - w scratches', value: '2' },
    { name: 'VSR', value: '3' }
  ]
  /**
   * Radio buttons end
   */

  /**
   * offCanvas
   */

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * delete button & modal
   */
  const [name, setName] = useState('Name');
  const [mail, setMail] = useState('Mail');

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

  window.onload = function () {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    const btnOpenPopup = document.querySelector('.btn-open-popup');
    const updateAccount = document.querySelector('.updateAccount');
    const modal2 = document.querySelector('.modal2');

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.toggle('show');

        if (!modal.classList.contains('show')) {
          body.style.overflow = 'auto';
        }
      }
    });
    modal2.addEventListener('click', (event) => {
      if (event.target === modal2) {
        modal2.classList.toggle('show');

        if (!modal2.classList.contains('show')) {
          body.style.overflow = 'auto';
        }
      }
    });
    updateAccount.addEventListener('click', () => {
      var name = document.f.name.value;
      var mail = document.f.mail.value;

      setMail(mail);
      setName(name);
    });

  }

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    var ori_img_length = images.length;
    setImages(imageList);
    const frm = new FormData();
    for (var img of imageList.slice(ori_img_length)) {
      frm.append("images", img.file);
    }
    axios
      .post(window.location.href + "api/image/new/0/" + radioValue, frm, {
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
    <div>
      <div className="App">
        {/* header */}


        <Stack gap={2}>
          <div className="bg-light border" style={{ maxWidth: '100%', flex: 'center' }}>
            {/** Header */}
            <Navbar bg="light" expand="lg">
              <Container>
                <Button className='offcanvas' onClick={handleShow} style={{ 'marginRight': '20px', fontWeight: "bold" }}>三</Button>
                <Navbar.Brand href="#home">Sharpic</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                  <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Settings</Nav.Link>
                    <NavDropdown title="information" id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={modalProfile} >Account Preferences</NavDropdown.Item>

                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.2">
                        Develper Github
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>


                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>

          <div>


            <Stack>

              <Stack direction="horizontal" gap={2} style={{ height: "100%", width: "100%" }}> {/** user profile */}
                <div>
                  <meta charSet="UTF-8" />
                  <title>Modal</title>
                  <style dangerouslySetInnerHTML={{ __html: "\n      .modal {\n        position: absolute;\n        top: 0;\n        left: 0;\n\n        width: 100%;\n        height: 100%;\n\n        display: none;\n\n        background-color: rgba(0, 0, 0, 0.4);\n      }\n\n      .modal.show {\n        display: block;\n      }\n\n      .modal_body {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n\n        width: 400px;\n        height: 600px;\n\n        padding: 40px;\n\n        text-align: center;\n\n        background-color: rgb(255, 255, 255);\n        border-radius: 10px;\n        box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);\n\n        transform: translateX(-50%) translateY(-50%);\n      }\n    " }} />

                  <div className="modal">
                    <div className="modal_body" style={{ textAlign: "left" }}>
                      <h1 style={{ color: "blue", fontWeight: "bold" }}>개인정보</h1>

                      <form name="f">
                        <p style={{ fontWeight: "bold" }}>Name : &nbsp;&nbsp; <input id="form_name" type="text" name="name" placeholder="hong gil dong" /></p>
                        <p style={{ fontWeight: "bold" }}>Mail :&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<input type="text" name="mail" placeholder="hong@gmail.com" /></p>
                        <p style={{ fontWeight: "bold" }}>age :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" name="age" placeholder="20" /></p>
                        <p style={{ fontWeight: "bold" }}>gender :&nbsp; <input type="text" name="gender" placeholder="M" /></p>


                        <br></br><br></br><br></br><br></br>
                        <Button variant="primary" className="updateAccount" style={{ marginRight: '10px' }} onClick={() => modalProfile(true)}>변경</Button>
                        <Button variant="danger" className="updateAccount" onClick={() => modalProfile(false)}>취소</Button>
                      </form>

                      {/* <p><input type="button" style={{ display: "block", margin: "auto", width: "200px", backgroundColor: "blue", color: "white" }} value="변경" onClick="send_go()" /></p> */}
                    </div>
                  </div>


                  {/** Add some margin */}



                  <Offcanvas show={show} onHide={handleClose}>

                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>Sharpic</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                      <Card style={{ marginTop: '10px', marginLeft: '10px', height: "55rem", width: "21rem" }}>
                        <Card.Body>

                          <Card.Title>{name}</Card.Title>
                          <Card.Text>{mail}</Card.Text>

                          {/**Add dividor line */}
                          <hr></hr>

                          <ListGroup as="ol">

                            <Button name="albumButton" className="albumSetting" style={{ marginBottom: '10px' }} onClick={() => addAlbum(1)} >Add album</Button>
                            <ListGroup.Item
                              as="li"
                              className="list1"
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">All images</div>
                                모든 내 사진
                              </div>
                              <Badge bg="primary" pill>
                                속한 사진 숫자
                              </Badge>
                            </ListGroup.Item>


                            <ListGroup.Item
                              as="li"
                              className="list2"
                              style={{ display: 'none' }}
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">Tokyo Travel</div>
                                도쿄 여행집
                              </div>
                              <Badge bg="primary" pill>
                                속한 사진 숫자
                              </Badge>
                            </ListGroup.Item>


                            <ListGroup.Item
                              as="li"
                              className="list3"
                              style={{ display: 'none' }}
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">New york Travel</div>
                                뉴욕 여행집
                              </div>
                              <Badge bg="primary" pill>
                                속한 사진 숫자
                              </Badge>
                            </ListGroup.Item>
                          </ListGroup>
                        </Card.Body>
                      </Card>

                    </Offcanvas.Body>
                  </Offcanvas>



                </div>

                <div style={{ width: '2000px', height: '850px' }}> {/** Main body */}

                  {/** Add nav bar */}
                  <Navbar bg='light'>
                    <Container>
                      <Navbar.Brand href="#home">Seoul Travel</Navbar.Brand>
                      <Navbar.Toggle />
                      <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                          <a href="#album_setting">Album settings</a>
                        </Navbar.Text>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>

                  <Container fluid>

                    <ButtonGroup className="mb-2" style={{ zIndex: "1" }}>
                      {radios.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant="outline-secondary"
                          name="radio"
                          value={radio.value}
                          checked={radioValue === radio.value}
                          onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                          {radio.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>

                    <Row style={{ width: '100%' }}>

                      {/* {imageIds.map((imageId, index) => (
                        <div key={index + "-grid"} className="image" style={{ float: 'left', width: '100%' }}>
                          <a href={window.location.href + "api/image/" + imageId} target="_blank" rel="noreferrer">
                            <img src={window.location.href + "api/image/" + imageId} alt="" width="500" />
                          </a>
                        </div>
                      ))} */}

                      <div>
                        <ImageUploading
                          multiple
                          value={images}
                          onChange={onChange}
                          maxNumber={maxNumber}
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
                                {/* {imageList.map((image, index) => (
                                  <div key={index} style={{ marginTop: '10px', float: "left", margin: "20px", marginRight: "25px" }}>
                                    <img src={image.data_url} alt="" width="300" height="200" onClick={() => openModal(image.data_url, 'processing.png')} />
                                    <img src='delete.png' style={{ width: "30px", height: "30px", position: "absolute" }} alt='close' z-index='3' onClick={() => onImageRemove(index)} />
                                  </div>
                                ))} */}
                                {imageIds.map((imageId, index) => (
                                  <div key={index} style={{ marginTop: '10px', float: "left", margin: "20px", marginRight: "25px" }}>
                                    <img src={window.location.href + "api/image/" + imageId} alt="" width="300" height="200" onClick={() => openModal(window.location.href + "api/image/" + imageId, window.location.href + "api/image/processed/" + imageId)} />
                                    <img src='delete.png' style={{ width: "30px", height: "30px", position: "absolute" }} alt='close' z-index='3' onClick={() => onImageRemove(index)} />
                                  </div>
                                ))}
                              </div>
                            </Stack>
                          )}

                        </ImageUploading>
                      </div>


                    </Row>

                  </Container>


                </div>


              </Stack> {/** End of horizontal stack */}
              {/* 슬라이더 팝업 */}
              <style dangerouslySetInnerHTML={{ __html: "\n.modal2 {\nposition: absolute;\n z-index:5; top: 0;\n\n\nwidth: 100%;\nheight: 100%;\n\ndisplay: none;\n        background-color: rgba(0, 0, 0, 0.9);\n      }\n\n      .modal2.show {\n      display: block;\n      }\n\n      .modal2_body {\n        position: absolute;\n      \n  top: 50%;\n        left: 50%;\n\n        width: 1100px;\n        height: 800px;\n\n        padding: 40px;\n\n        text-align: center;\n\n        background-color: rgb(192, 192, 192);\n        border-radius: 10px;\n        box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);\n\n        transform: translateX(-50%) translateY(-50%);\n      }\n    " }} />
              <div className="modal2" >

              </div>

            </Stack>

          </div>

        </Stack>

      </div>
    </div>
  );

  function openModal(_src, _src2) {
    const modal2 = document.querySelector('.modal2');
    const body = document.querySelector('body');

    if (modal2.classList.contains('show')) {
      modal2.classList.remove('show');
      body.style.overflow = 'auto';
    } else {
      modal2.classList.add('show');
      body.style.overflow = 'hidden';
    }

    ReactDOM.createRoot(document.querySelector('.modal2')).render(

      <Stack style={{ width: "100%", height: "100%", alignItems: "center", textAlign: "center", margin: "50px" }}>

        <Row >
          <ReactCompareSlider style={{width:"50vw", marginBottom:"80px", alignItems:"center", textAlign:"center"}}
            itemOne={<ReactCompareSliderImage src={_src} alt="Image one" />}
            itemTwo={<ReactCompareSliderImage src={_src2} alt="Image two" />}
          />
        </Row>

        <Row>
          <Button variant='danger' onClick={openModal}>Close</Button>
        </Row>

        {/*
          <ReactCompareSlider>
            itemOne = {<ReactCompareSliderImage src={_src} alt='img1' />}
            itemTwo = {<ReactCompareSliderImage src={_src} alt='img2' />}
          </ReactCompareSlider> */}
      </Stack>
    );
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