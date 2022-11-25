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
import Offcanvas from 'react-bootstrap/Offcanvas';

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import Row from 'react-bootstrap/Row';

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

  window.onload = function () {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    const btnOpenPopup = document.querySelector('.btn-open-popup');
    const updateAccount = document.querySelector('.updateAccount');
    const albumSetting = document.querySelector('.albumSetting');
    const offcanvas = document.querySelector('.offcanvas');

    const list2 = document.querySelector('.list2');
    const list3 = document.querySelector('.list3');
    const list4 = document.querySelector('.list4');
    const list5 = document.querySelector('.list5');

    var current_list = 1;  // 현재 선택된 리스트


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
    updateAccount.addEventListener('click', () => {
      var name = document.f.name.value;
      var mail = document.f.mail.value;

     
      setMail(mail);
      setName(name);
    });

    albumSetting.addEventListener('click', () => {

        if (current_list == 1) {
            list2.style.display = "block";
            current_list += 1;
        } else if (current_list == 2) {
            list3.style.display = "block";
            current_list += 1;
        }
    });

    offcanvas.addEventListener('click', () => {
        if (current_list == 2) {
            list2.style.display = "none";
            current_list -= 1;
        } else if (current_list == 3) {
            list3.style.display = "none";
            current_list -= 1;
        }
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
          <div className="bg-light border" style={{maxWidth: '1200px', flex: 'center'}}>
            {/** Header */}
            <Navbar bg="light" expand="lg">
              <Container>
                <Button className='offcanvas' onClick={handleShow} style={{'marginRight': '20px', fontWeight: "bold"}}>三</Button>
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

                      <form name="f">
                        <p style={{ fontWeight: "bold" }}>Name : &nbsp;&nbsp; <input type="text" name="name" placeholder="hong gil dong" /></p>
                        <p style={{ fontWeight: "bold" }}>Mail :&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<input type="text" name="mail" placeholder="hong@gmail.com" /></p>
                        <p style={{ fontWeight: "bold" }}>age :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" name="age" placeholder="20" /></p>
                        <p style={{ fontWeight: "bold" }}>gender :&nbsp; <input type="text" name="gender" placeholder="M" /></p>


                        <br></br><br></br><br></br><br></br>
                        <Button variant="primary" className="updateAccount">변경</Button>
                      </form>
                      
                      {/* <p><input type="button" style={{ display: "block", margin: "auto", width: "200px", backgroundColor: "blue", color: "white" }} value="변경" onClick="send_go()" /></p> */}
                    </div>
                  </div>


                  {/** Add some margin */}




                  <Card style={{ marginTop: '10px', marginLeft: '10px', height: "55rem", width: "21rem" }}>
                    <Card.Body>

                      <Card.Title>{ name }</Card.Title>
                      <Card.Text>{ mail }</Card.Text>
                      <Button  className="btn-open-popup">my Account</Button>
                      <br></br><br></br>

                      {/**Add dividor line */}
                      <hr></hr>

                      <ListGroup as="ol">

                      <Button name="albumButton" className="albumSetting" style={{marginBottom: '10px'}}>Add album</Button>
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
                          style={{display: 'none'}}
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
                          style={{display: 'none'}}
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
                                    itemTwo={<ReactCompareSliderImage src={image.data_url} style={{ filter: "grayscale(1)" }} alt="Image two" />}
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

                  </Container>





                </div>


              </Stack> {/** End of horizontal stack */}


            </Stack>

          </div>

        </Stack>

      </div>
    </div>
  );





}