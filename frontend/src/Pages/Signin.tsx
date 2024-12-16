import React, { useState } from "react";
import "../Styles/Common.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Axios/Axios.ts";
import { useAuth } from "../Context/AuthContext.tsx";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("/auth/login", formData);
      const token = response.data.token;
      localStorage.setItem("token", token);
      login();
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <div className="center">
          <div id="logo">
            <img src="/images/icon.png" alt="Logo" />
            <p>HD</p>
          </div>
          <h1>Sign In</h1>
          <p className="to-access">Log in to access your dashboard.</p>
        </div>
        <form onSubmit={handleSubmit}>
          {["email", "password"].map((field) => (
            <div className="input-group" key={field}>
              <input
                type="text"
                id={field}
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label htmlFor={field}>
                {field === "password" ? "password" : "Email Address"}
              </label>
            </div>
          ))}
          <button type="submit">Sign In</button>
            <Link to="/otp"><button id="forgot">Forgot password?</button></Link>
          <div className="or-divider">or</div>
          <button className="google-button">
            Sign in with Google
            <img src="/images/plus.png" alt="Google Icon" />
          </button>
        </form>
        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
      <div className="signin-right">
        <img src="/images/image1.png" alt="Background" />
      </div>
    </div>
  );
};

export default SignIn;
