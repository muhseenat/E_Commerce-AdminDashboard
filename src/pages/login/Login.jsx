import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";
import axios from "../../axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminToken");
    if (loggedIn) {
      navigate("/admindashboard");
      return false;
    }
  }, []);

  const adminLogin = (e) => {
    e.preventDefault();
    const loginData = { email, password };

    axios
      .post("auth/admin/login", loginData)
      .then((resp) => {
        localStorage.setItem("token", resp.data.adminToken);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response?.data.errorMessage);
      });
  };
  return (
    <div className="login">
      <h1> Admin Login</h1>
      <form onSubmit={adminLogin}>
        <div className="row">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="row">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="loginbtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
