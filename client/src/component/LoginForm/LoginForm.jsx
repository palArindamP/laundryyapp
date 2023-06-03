import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { Validation } from "simple-validator-js";
import axios from "axios";
import { USER_LOGIN_URL } from "../../constants";
// import { useContext } from "react";
// import { UserContext } from "../UserContext";

const LoginFormComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  function handleEmail(event) {
    let inputval = event.target.value;
    setEmail(inputval);
    let ValidationInfo = new Validation(inputval).customRegex(
      /^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$/
    );
    if (ValidationInfo.result.isValid === false) {
      setEmailError("visible");
    } else {
      setEmailError("hidden");
    }
  }

  function handlePassword(e) {
    let inputval = e.target.value;
    setPassword(inputval);
  }

  function handleLogin(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_BASE_URL}${USER_LOGIN_URL}`;
    axios
      .post(url, { email, password })
      .then((response) => {
        sessionStorage.setItem("auth", JSON.stringify(response.data.data));
        setError("");

        navigate("/make-order");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      });
  }

  return (
    <>
      <form className="loginform">
        <div className="lh">
          <h1>
            Laundry <br /> Service
          </h1>
          <p id="p1">Doorstep Wash & Dryclean Service</p>
          <p id="p2">Don't have an account?</p>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="line"></div>
        <div className="rh">
          <p>SIGN IN</p>
          <div id="l1">
            <label>
              <input
                placeholder=" "
                type="text"
                value={email}
                required
                onChange={handleEmail}
              />
              <span>E-mail</span>
              <span
                style={{
                  marginTop: "30px",
                  marginLeft: "180px",
                  color: "red",
                  fontWeight: "bold",
                  visibility: emailError,
                }}
              >
                Please Enter a valid Email 
              </span>
            </label>
          </div>
          <div id="l2">
            <label>
              <input
                placeholder=" "
                type="password"
                value={password}
                required
                onChange={handlePassword}
              />
              <span>Password</span>
              <span id="padlock">
                <img src={require("../../Images/padlock.png")} alt="" />
              </span>
            </label>
          </div>
          <span id="error">{error}</span>
          <span id="fg">Forgot Password?</span>
          <button onClick={handleLogin}>Sign In</button>
        </div>
      </form>
    </>
  );
};

export default LoginFormComponent;