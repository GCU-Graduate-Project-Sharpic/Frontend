import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Login.css";

function Login(props) {

  const[username, setName]=useState('');
  const[password, setPassword]=useState('');
  const nameChange=(e)=>{
    setName(e.target.value);
  }
  const passwordChange=(e)=>{
    setPassword(e.target.value);
  }
  
  useEffect(()=>{
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
  });
  
  const appClick = () => {
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
  const appKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.appClick();
    }
  }
  const register = (e) => {
    window.location.replace("/signup")
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={register}>
              Sign Up
            </span>
          </div>
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
              onKeyDown={appKeyPress}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={appClick} type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;