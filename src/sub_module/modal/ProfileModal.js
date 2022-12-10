import React from 'react';
import Button from 'react-bootstrap/Button';
import "./ImageModal.css";
function ProfileModal(props) {
    return (
        <div>

            <div className="modal">
                <div className="modal_body" >
                    <h1 >개인정보</h1>

                    <form name="f">
                        <p>Name : &nbsp;&nbsp; <input id="form_name" type="text" name="name" placeholder="hong gil dong" /></p>
                        <p>Mail :&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<input type="text" name="mail" placeholder="hong@gmail.com" /></p>
                        <p>age :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" name="age" placeholder="20" /></p>
                        <p>gender :&nbsp; <input type="text" name="gender" placeholder="M" /></p>


                        <br></br><br></br><br></br><br></br>
                        <Button variant="primary" className="updateAccount" style={{ marginRight: '10px' }} onClick={() => props.modalProfile(true)}>변경</Button>
                        <Button variant="danger" className="updateAccount" onClick={() => props.modalProfile(false)}>취소</Button>
                    </form>

                    {/* <p><input type="button" style={{ display: "block", margin: "auto", width: "200px", backgroundColor: "blue", color: "white" }} value="변경" onClick="send_go()" /></p> */}
                </div>
            </div>
        </div>
    )
}

export default ProfileModal;