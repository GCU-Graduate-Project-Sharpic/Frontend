import React from 'react';
import Button from 'react-bootstrap/Button';

function ProfileModal(props) {
    return (
        <div>
            <style dangerouslySetInnerHTML={{ __html: "\n      .modal {\n        position: absolute;\n        top: 0;\n        left: 0;\n\n        width: 100%;\n        height: 100%;\n\n        display: none;\n\n        background-color: rgba(0, 0, 0, 0.4);\n      }\n\n      .modal.show {\n        display: block;\n      }\n\n      .modal_body {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n\n        width: 400px;\n        height: 600px;\n\n        padding: 40px;\n\n        text-align: center;\n\n        background-color: rgb(255, 255, 255);\n        border-radius: 10px;\n        box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);\n\n        transform: translateX(-50%) translateY(-50%);\n      }\n    " }} />

            <div className="modal">
                <div className="modal_body" style={{ textAlign: "left" }}>
                    <h1 style={{ color: "blue", fontWeight: "bold" }}>개인정보</h1>

                    <form name="f">
                        <p style={{ fontWeight: "bold" }}>Name : &nbsp;&nbsp; <input id="form_name" type="text" name="name" placeholder="hong gil dong" /></p>
                        <p style={{ fontWeight: "bold" }}>Mail :&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<input type="text" name="mail" placeholder="hong@gmail.com" /></p>
                        <p style={{ fontWeight: "bold" }}>age :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" name="age" placeholder="20" /></p>
                        <p style={{ fontWeight: "bold" }}>gender :&nbsp; <input type="text" name="gender" placeholder="M" /></p>


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