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
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Stack from 'react-bootstrap/Stack';
// import React, { useEffect, useState } from 'react';

export default function App() {


  /**
   * Radio buttons 
   */
  const [radioValue, setRadioValue] = React.useState('1');

  const radios = [
    { name: 'Super resolution', value: '1' },
    { name: 'Filtering', value: '2' },
    { name: 'Color conversion', value: '3' },
  ];
  /**
   * Radio buttons end
   */

  /**
   * delete button & modal
   */
  const [show, setShow] = useState(false);


  const [images, setImages] = React.useState([]);
  const [imageIds, setImageIds] = React.useState([]);
  const maxNumber = 69;
  React.useEffect(() => {
    axios.get(window.location.href + "image/list")
      .then((res) => {
        if (res.data.list != null) {
          setImageIds(res.data.list);
        }
      });
  }, []);

  const body = document.querySelector('body');
  const modal = document.querySelector('.modal');
  const btnOpenPopup = document.querySelector('.btn-open-popup');

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    var ori_img_length = images.length;
    setImages(imageList);
    const frm = new FormData();
    for (var img of imageList.slice(ori_img_length)) {
      frm.append("images", img.file);
    }
    axios
      .post(window.location.href + "image", frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === "files uploaded!") {
          window.alert("Image uploaded")
        } else {
          console.log(res.status)
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("Fail to upload image");
      });
  };

  return (
    <div>
      <div className="App">
        {/* header */}


        <Stack gap={2}>
          <div className="bg-light border">
            {/** Header */}
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="#home">Sharpic</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">


                  <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Settings</Nav.Link>
                    <NavDropdown title="information" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>

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


                      <p style={{ fontWeight: "bold" }}>Name : &nbsp;&nbsp; <input type="text" name="name" placeholder="hong gil dong" /></p>
                      <p style={{ fontWeight: "bold" }}>Mail :&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<input type="text" name="mail" placeholder="hong@gmail.com" /></p>
                      <p style={{ fontWeight: "bold" }}>age :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" name="age" placeholder="20" /></p>
                      <p style={{ fontWeight: "bold" }}>gender :&nbsp; <input type="text" name="gender" placeholder="M" /></p>


                      <br></br><br></br><br></br><br></br>
                      <p><input type="button" style={{ display: "block", margin: "auto", width: "200px", backgroundColor: "blue", color: "white" }} value="변경" onClick="send_go()" /></p>
                    </div>
                  </div>
                  {/** Add some margin */}
                  <Card style={{ marginTop: '10px', marginLeft: '10px', height: "55rem", width: "26rem" }}>
                    <Card.Body>
                      <Card.Title>User Name</Card.Title>
                      <Card.Text>
                        User information
                      </Card.Text>
                      <Button variant="primary" className="btn-open-popup" onClick={Account()}>my Account</Button>

                      {/**Add dividor line */}
                      <hr></hr>

                      <ListGroup as="ol" numbered>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">Seoul Travel</div>
                            서울여행집
                          </div>
                          <Badge bg="primary" pill>
                            속한 사진 숫자
                          </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start"
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
                          className="d-flex justify-content-between align-items-start"
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
                    <Row style={{ width: '100%' }}>

                      {imageIds.map((imageId, index) => (
                        <div key={index + "-grid"} className="image" style={{ float: 'left', width: '100%' }}>
                          <a href={window.location.href + "image/" + imageId} target="_blank" rel="noreferrer">
                            <img src={window.location.href + "image/" + imageId} alt="" width="500" />
                          </a>
                        </div>
                      ))}

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

                            <Stack style={{ marginTop: '10px' }}>

                              <ButtonGroup className="mb-2">
                                {radios.map((radio, idx) => (
                                  <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    textAlign="center"
                                    Align="center"
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                  >
                                    {radio.name}
                                  </ToggleButton>
                                ))}
                              </ButtonGroup>

                              <Button variant='primary' size='sm' onClick={onImageUpload} {...dragProps}>
                                Click or Drop here
                              </Button>{' '}

                              &nbsp;
                              <Button variant='danger' size='sm' onClick={onImageRemoveAll}>Remove all images</Button>
                              {/* {imageList.map((image, index) => (
                                <div key={index}>
                                  <img src={image.data_url} />
                                  <button onClick={() => onImageUpdate(index)}>Update</button>
                                  <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                              ))} */}
                              {imageList.map((image, index) => (
                                <div key={index} width="100%" style={{ marginTop: '10px' }}>
                                  <ReactCompareSlider
                                    itemOne={<ReactCompareSliderImage src={image.data_url} alt="Image one" />}
                                    itemTwo={<ReactCompareSliderImage src={image.data_url}  style={{filter:"grayscale(1)"}} alt="Image two" />}
                                  />
                                  <div className="image-item__btn-wrapper" width="200">

                                    <DropdownButton id="dropdown-basic-button" title="Processing"
                                      style={{ margin: '10px' }}>
                                      <Dropdown.Item href=''>Super resolution</Dropdown.Item>
                                      <Dropdown.Item href=''>Restoration</Dropdown.Item>
                                      <Dropdown.Item href=''>Color conversion</Dropdown.Item>
                                      <Dropdown.Item onClick={() => onImageUpdate(index)}>Update</Dropdown.Item>
                                    </DropdownButton>

                                    <>
                                      <Button variant='danger' onClick={() => onImageRemove(index)}>Remove</Button>
                                      {/* <Modal show={show} onHide={() => setShow(false)}>
                                        <Modal.Header closeButton>
                                          <Modal.Title>Remove</Modal.Title>
                                          <Modal.Body>Are you sure remove this picture?</Modal.Body>
                                          <Modal.Footer>
                                            <Button variant='secondary' onClick={() => setShow(false)}>
                                              No
                                            </Button>
                                            <Button onClick={() => {
                                              console.log(index);
                                              onImageRemove(index);
                                              setShow(false);
                                            }}>
                                              Yes
                                            </Button>
                                          </Modal.Footer>
                                        </Modal.Header>
                                      </Modal> */}
                                    </>
                                  </div>
                                </div>
                              ))
                              }
                            </Stack>
                          )}

                        </ImageUploading>
                      </div>


                    </Row>

                    <Row>
                      {/** https://www.npmjs.com/package/img-comparison-slider */}
                      <script
                        defer
                        src="https://unpkg.com/img-comparison-slider@7/dist/index.js"
                      ></script>
                      <link
                        rel="stylesheet"
                        href="https://unpkg.com/img-comparison-slider@7/dist/styles.css"
                      />

                      <img-comparison-slider>
                        <img slot="first" src="./figures/human_face.png" />
                        <img slot="second" src="./figures/human_face.png" />
                      </img-comparison-slider>
                    </Row>

                  </Container>





                </div>


              </Stack> {/** End of horizontal stack */}


            </Stack>

          </div>

        </Stack>

      </div>
    </div>
  );

  function Account() {
    btnOpenPopup.addEventListener('click', () => {
      modal.classList.toggle('show');

      if (modal.classList.contains('show')) {
        body.style.overflow = 'hidden';
      }
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.toggle('show');

        if (!modal.classList.contains('show')) {
          body.style.overflow = 'auto';
        }
      }
    });
  }
  function send_go() {
    var name = document.f.name.value;
    var mail = document.f.mail.value;
    var age = document.f.age.value;
    var gender = document.f.gender.value;
    document.getElementById("res1").innerHTML = name;
    document.getElementById("res2").innerHTML = mail;
    document.getElementById("res3").innerHTML = age;
    document.getElementById("res4").innerHTML = gender;


  }
}