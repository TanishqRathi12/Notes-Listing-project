import React, { useState } from "react";
import "../Styles/Common.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/signup", formData);
      alert("Signup successful!");
      navigate("/"); // Navigate to sign-in page
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="center">
          <div className="logo">
            <img src="/images/icon.png" alt="Logo" />
            <p>HD</p>
          </div>
          <h1>Sign Up</h1>
          <p className="to-access">Join us to unlock exclusive features.</p>
        </div>
        <form onSubmit={handleSubmit}>
          {["name", "dob", "email", "password"].map((field) => (
            <div className="input-group" key={field}>
              <input
                type={field === "dob" ? "date" : "text"}
                id={field}
                required
                onChange={handleChange}
              />
              <label htmlFor={field}>
                {field === "password" ? "Password" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
          <button type="submit">Sign Up</button>
          <div className="or-divider">or</div>
          <button className="google-button">
            Sign up with Google
            <img src="/images/plus.png" alt="Google Icon" />
          </button>
        </form>
        <p className="signin-link">
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
      <div className="signup-right">
        <img src="/images/image1.png" alt="Background" />
      </div>
    </div>
  );
};

export default SignUp;
