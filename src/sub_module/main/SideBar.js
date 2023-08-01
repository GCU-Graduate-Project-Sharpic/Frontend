import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import "./SideBar.css";

function SideBar(props) {

  var hide_opt = props.inOffCanvas == false ? "d-none d-lg-block" : "d-lg-none";

  function addAlbum() {
    let newAlbumTitle = window.prompt("Enter new album title");
    if (newAlbumTitle == null || newAlbumTitle == "") {
      return;
    }
    axios.post(window.location.origin + "/api/album/new", {
      title: newAlbumTitle
    },
      { 'Content-Type': 'application/json', withCredentials: true }
    )
      .then((res) => {
        if (res.data.status == 'new album success') {
          return axios.get(window.location.origin + "/api/album/list");
        }
      })
      .then((res) => {
        props.setAlbumList(res.data.albumList);
      });
  }

  function changeAlbum(newAlbum) {
    props.setCurrentAlbum(newAlbum);
    props.setImageIds(newAlbum.imageIds);
  }

  return (

    <Card id='sidebar'
      className={hide_opt}
    // fit height of screen 

    >
      <Card.Body>

        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.email}</Card.Text>

        {/**Add dividor line */}
        <hr></hr>
        <Button variant="outline-secondary" name="albumButton" className="albumSetting" style={{ marginBottom: '10px' }} onClick={() => addAlbum()} >Add album</Button>
        <ListGroup  defaultActiveKey={"#link" + props.currentAlbum.id}>
          {
            props.albumList.map((album) => (
              <ListGroup.Item
                as="li"
                href={"#link" + album.id}
                onClick={() => changeAlbum(album)}
                action variant="light"
              >
                <div >
                  <div className="fw-bold">{album.title}</div>
                </div>
                <Badge bg="secondary" pill>
                  {album.imageIds.length}
                </Badge>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </Card.Body>
    </Card>

  )
}

export default SideBar;