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
      <Navbar.Brand href="#home">Sharpic</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Settings</Nav.Link>
          <NavDropdown title="information" id="basic-nav-dropdown">

            <NavDropdown.Item onClick={props.modalProfile} >Account Preferences</NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.2">
              Develper Github
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>


      </Navbar.Collapse>
    </Container>
  </Navbar>

  );
}

export default TopBar;