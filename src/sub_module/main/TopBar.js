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
    
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Sharpic</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="me-auto">
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