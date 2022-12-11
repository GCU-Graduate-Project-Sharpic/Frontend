import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import "./ImageModal.css";
function ProfileModal(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const nameChange = (e) => {
    setName(e.target.value);
  }

  const emailChange = (e) => {
    setEmail(e.target.value);
  }
  return (

    <div>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>User Preferences</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form>
              <Form.Text className="text-muted">
                Your name and mail will be display on the sidebar.
              </Form.Text> <br />
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="email" placeholder="Enter Name" onChange={nameChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mail</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" onChange={emailChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Age</Form.Label>
                <Form.Control type="email" placeholder="Enter Age" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Gender</Form.Label>
                <Form.Control type="email" placeholder="Enter Gender" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" className="updateAccount" style={{ marginRight: '10px' }} onClick={() => props.modalProfile(true, name, email)}>변경</Button>
            <Button variant="danger" className="updateAccount" onClick={() => props.modalProfile(false, name, email)}>취소</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>

    </div>
  )
}

export default ProfileModal;