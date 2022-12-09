import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function SideBar(props) {

    var hide_opt = props.inOffCanvas == false ? "d-none d-lg-block" : "d-lg-none";

    return (

        <Card 
         className={hide_opt}
         // fit height of screen 
            style={{marginTop: '8px', marginLeft: '8px', marginBottom: '8px',  height: '100%', width: '100%', float: 'left', overflow: 'auto' }}
         >
            <Card.Body>

                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.mail}</Card.Text>

                {/**Add dividor line */}
                <hr></hr>

                <ListGroup as="ol">

                    <Button name="albumButton" className="albumSetting" style={{ marginBottom: '10px' }} onClick={() => props.addAlbum(1)} >Add album</Button>
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

    )
}

export default SideBar;