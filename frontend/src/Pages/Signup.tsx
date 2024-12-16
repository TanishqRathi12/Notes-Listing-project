import React, { useState } from "react";
import "../Styles/Common.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Axios/Axios.ts";
import { useAuth } from "../Context/AuthContext.tsx";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "", 
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [initialRequestMessage, setInitialRequestMessage] = useState(""); 
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    setInitialRequestMessage("Please wait, the first request may take longer because the server is sleeping on render.");

    try {
      const response = await axios.post("/auth/register", formData);
      console.log("Signup response:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      signup();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
      setInitialRequestMessage("");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="center">
          <div id="logo">
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
                type={field === "dob" ? "date" : field === "password" ? "password" : "text"}
                id={field}
                required
                onChange={handleChange}
              />
              <label htmlFor={field}>
                {field === "password" ? "Password" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="or-divider">or</div>
          <button className="google-button">
            Sign up with Google
            <img src="/images/plus.png" alt="Google Icon" />
          </button>
        </form>
        {initialRequestMessage && <p className="initial-request-message">{initialRequestMessage}</p>}
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
