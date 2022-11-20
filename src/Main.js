import React from 'react';
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

<Stack direction="horizontal" gap={2} style={{height: "100%", width: "100%"}}> {/** user profile */}
    <div>
      {/** Add some margin */}
      <Card style={{ marginTop: '10px', marginLeft: '10px', height:"55rem", width:"26rem"}}> 
        <Card.Body> 
          <Card.Title>User Name</Card.Title>
          <Card.Text>
            User information 
          </Card.Text>
          <Button variant="primary">my Account</Button>

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

    <div style={{width: '2000px', height: '850px'}}> {/** Main body */}

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
        <Row style={{width: '100%'}}>
          
        {imageIds.map((imageId, index) => (
                <div key={index + "-grid"} className="image" style={{ float: 'left', width: '100%' }}>
                  <a href={window.location.href + "image/" + imageId} target="_blank" rel="noreferrer">
                    <img src={window.location.href + "image/" + imageId} alt="" width="200" />
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

                  <Stack style={{marginTop: '10px'}}>

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
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img src={image.data_url} alt="" width="200" style={{marginTop: '10px'}}/>
                            <div className="image-item__btn-wrapper">
                              <button onClick={() => onImageUpdate(index)}>Update</button>
                              <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                          </div>
                        ))}

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


    {/** Copy paste this in this div 
             <div>
            <div className="imagetitle">
                <img style={{ width: "3vw", height: "3vw", marginLeft: "30px", marginRight: "10px", float: "left" }} alt="book" src="book.png" />
                <img id="share" style={{ width: "1.5vw", height: "1.5vw", marginTop: "5px", marginLeft: "10px", float: "right" }} alt="friend" src="friend.png" />
                <img style={{ width: "1.5vw", height: "1.5vw", marginTop: "5px", marginLeft: "10px", marginRight: "10px", float: "right" }} alt="share" src="share.png" />
                <img style={{ width: "1.5vw", height: "1.5vw", marginTop: "5px", marginLeft: "10px", marginRight: "10px", float: "right" }} alt="menu" src="menu.png" />
                <img style={{ width: "1.5vw", height: "1.5vw", marginTop: "5px", marginLeft: "10px", marginRight: "10px", float: "right" }} alt="menu2" src="menu2.png" />

                <h1 style={{ marginLeft: "40px", marginTop: "20px" }}>Seoul Travel</h1>
            </div>

            <div id="image-grid" style={{border: '2px'}}>
              {imageIds.map((imageId, index) => (
                <div key={index + "-grid"} className="image" style={{ float: 'left' }}>
                  <a href={window.location.href + "image/" + imageId} target="_blank" rel="noreferrer">
                    <img src={window.location.href + "image/" + imageId} alt="" width="200" />
                  </a>
                </div>
              ))}
            </div>


            <div className='imgmenu'>
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

                  <div>

                      <ButtonGroup className="mb-2"> 
                            </ButtonGroup>
                            <br />
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

                    <div className='vr'></div>
                    
                    &nbsp;
                    <Button variant='danger' size='sm' onClick={onImageRemoveAll}>Remove all images</Button>
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image.data_url} alt="" width="200" style={{marginTop: '10px'}}/>
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
     */}


    </div>
  

</Stack> {/** End of horizontal stack */}


</Stack>

      </div>

      </Stack>

        </div>
      </div>
  );
}
