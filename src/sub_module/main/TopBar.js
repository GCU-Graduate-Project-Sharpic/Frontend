import React from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

/**
 * ImageTable
 * TopBar
 * AlbumList
 * ImageModal
 */

function TopBar(props) {

  return (
    
    <Navbar style={{backgroundColor:"#A4A4A4"}} expand="lg">
    <Container>
      <Navbar.Brand  href="/"><img src="sharpic2.png" style={{width:"120x", height:"40px"}}></img></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="me-auto" style={{fontWeight:"bold", fontSize:"20px"}}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link onClick={props.modalProfile}>Settings</Nav.Link>
          <Nav.Link href="https://github.com/GCU-Sharpic">Develper Github</Nav.Link>
        </Nav>


      </Navbar.Collapse>
    </Container>
  </Navbar>

  );
}

export default TopBar;