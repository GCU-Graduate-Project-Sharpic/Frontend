import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import SideBar from "./SideBar";

function OffCanvas(props) {
  const inOffCanvas = true;

  return (
    <Offcanvas placement={'start'} show={props.offcanvasShow} onHide={props.handleOffcanvasShow}>

      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Sharpic</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>

        <SideBar
          inOffCanvas={inOffCanvas}
          currentAlbum={props.currentAlbum}
          albumList={props.albumList}
          setCurrentAlbum={props.setCurrentAlbum}
          setAlbumList={props.setAlbumList}
          setImageIds={props.setImageIds}
          name={props.name}
          email={props.email}
        />

      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default OffCanvas;