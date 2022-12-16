import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ProfileModal from '../modal/ProfileModal';

function TopBar(props) {
  const [profileShow, setProfileShow] = React.useState(false);

  return (
    <Navbar style={{ backgroundColor: "#A4A4A4" }} expand="lg">
      <Container>
        <Navbar.Brand href="/"><img src="sharpic2.png" style={{ width: "120x", height: "40px" }}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto" style={{ fontWeight: "bold", fontSize: "20px" }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link onClick={() => modalProfile(false, null, null)}>Settings</Nav.Link>
            <Nav.Link href="https://github.com/GCU-Sharpic">Develper Github</Nav.Link>
          </Nav>


        </Navbar.Collapse>
      </Container>
      {
        profileShow &&
        <ProfileModal modalProfile={modalProfile}/>
      }
    </Navbar>

  );

  function modalProfile(change, newName, newEmail) {
    const body = document.querySelector('body');

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
      console.log(newName);

      props.setEmail(newEmail);
      props.setName(newName);
    }
  }
}

export default TopBar;