import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Login.css";

function Register(props) {

  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const nameChange = (e) => {
    setName(e.target.value);
  }
  const passwordChange = (e) => {
    setPassword(e.target.value);
  }
  const emailChange = (e) => {
    setEmail(e.target.value);
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
  })

  const confirm = (e) => {
    console.log(`username는 : ${username}\npw는 : ${password}\nemail은 : ${email}`);
    axios
      .post( // Login request
        window.location.origin + "/api/signup",
        {
          username: username,
          password: password,
          email: email
        },
        { 'Content-Type': 'application/json', withCredentials: true }
      )
      .then((res) => {
        console.log(res.data)
        if (res.data.status === 'signup success') {
          window.location.replace("/login")
        } else {
          console.log("wrong data");
        }
      })
      .catch((err) => alert(err));
  }
  const login = (e) => {
    window.location.replace("/login")
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={login}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={nameChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={emailChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={passwordChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={confirm} type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;