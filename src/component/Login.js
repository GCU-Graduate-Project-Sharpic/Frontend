import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Login.css";
import Button from 'react-bootstrap/Button';

function Login(props) {

  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const nameChange = (e) => {
    setName(e.target.value);
  }
  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  useEffect(() => {
    axios.get(window.location.origin + "/api/user")
      .then((res) => {
        if (res.status === 200) {
          window.location.replace("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("Not logged in")
        }
      })
  }, []);

  const loginClick = () => {
    axios
      .post( // Login request
        window.location.origin + "/api/login",
        {
          username: username,
          password: password,
          email: ' '
        },
        { 'Content-Type': 'application/json', withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === 'login success') {
          window.location.replace("/")
        } else {
          console.log('wrong data');
        }
      })
      .catch((err) => alert(err));

  }
  const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginClick();
    }
  }
  const register = (e) => {
    window.location.replace("/signup")
  }

  return (
    <div className="Auth-form-container">
      <div className="Auth-form" >
        <div className="Auth-form-content">
          <div className="sharpic">
            <img src="sharpic3.png" style={{ width: "319px", height: "125px"}} />
          </div>
          <br></br>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              className="form-control mt-1"
              placeholder="Enter user name"
              onChange={nameChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={passwordChange}
              onKeyDown={enterKeyPress}
            />
          </div>
          <br></br>
          <br></br>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={register} style={{cursor: "pointer"}}>
              Sign Up
            </span>
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="dark" onClick={loginClick} className="btn btn-primary">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Login;