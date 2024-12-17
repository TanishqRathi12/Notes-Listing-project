import React, { useState } from "react";
import "../Styles/Common.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Axios/Axios.ts";
import { useAuth } from "../Context/AuthContext.tsx";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [initialRequestMessage, setInitialRequestMessage] = useState(""); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); 
    setIsLoading(true);
    setInitialRequestMessage("Please wait, request may take time on free hosting.");

    try {
      const response = await axios.post("/auth/login", formData);
      const token = response.data.token;
      localStorage.setItem("token", token);
      login();
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error);
      setErrorMessage("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
      setInitialRequestMessage(""); 
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
                type={field === "password" ? "password" : "text"}
                id={field}
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label htmlFor={field}>
                {field === "password" ? "Password" : "Email Address"}
              </label>
            </div>
          ))}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Link to="/otp">
            <button id="forgot">Forgot password?</button>
          </Link>
          <div className="or-divider">or</div>
          <button className="google-button">
            Sign in with Google
            <img src="/images/plus.png" alt="Google Icon" />
          </button>
        </form>
        {initialRequestMessage && <p className="initial-request-message">{initialRequestMessage}</p>}
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
