import React, { Component } from "react";
import axios from 'axios';
import "./Login.css";

class Register extends Component {
  state = {
    username: '',
    password: '',
    email: ''
  }

  appChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  appClick = () => {
    console.log(`username는 : ${this.state.username}\npw는 : ${this.state.password}\nemail은 : ${this.state.email}`);
  }
  appKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.appClick();
    }
  }
  confirm = (e) => {
    axios
      .post( // Login request
        'https://sharpic.chromato99.com/signup',
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
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
  render() {
    const { username, password, email } = this.state;
    const { appChange, confirm, appKeyPress } = this;
    return (
      <div className="container-center-horizontal">
        <div className="desktop-1 screen">
          <h1 className="title">
            Sharpic
          </h1>
          <input type="text" name="username" placeholder="Email Address" value={username} onChange={appChange} className="component border-2px-black email-address valign-text-middle roboto-normal-black-15px" />
          <input type="password" name="password" placeholder="Password" value={password} onChange={appChange} className="overlap-group border-2px-black password valign-text-middle roboto-normal-black-15px" />
          <input type="text" name="email" placeholder="Nickname" value={email} onChange={appChange} onKeyPress={appKeyPress} className="component border-2px-black email-address valign-text-middle roboto-normal-black-15px" />
          <button onClick={confirm} className="button-1 log-in valign-text-middle">CONFIRM</button>
        </div>
      </div>
    );
  }
}

export default Register;