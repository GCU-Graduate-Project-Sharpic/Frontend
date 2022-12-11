import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import SideBar from "./SideBar";

function OffCanvas(props) {
    const inOffCanvas = true;

    return (
        <Offcanvas placement={'start'} show={props.offcanvasShow} onHide={props.handleClose}>

            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Sharpic</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <SideBar
                    inOffCanvas={inOffCanvas}
                    handleClose={props.handleClose}
                    addAlbum={props.addAlbum}
                    show={props.offcanvasShow}
                    name={props.name}
                    mail={props.mail}
                />

            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OffCanvas;