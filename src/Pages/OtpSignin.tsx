import React, { useState } from "react";
import "../Styles/Common.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Axios/Axios.ts";
import { useAuth } from "../Context/AuthContext.tsx";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [initialRequestMessage, setInitialRequestMessage] = useState(""); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSendingOtp) {
      return;
    }

    setIsSendingOtp(true);
    setInitialRequestMessage("Please wait, request may take time on free hosting.");

    try {
      const response = await axios.post("/otp/sendotp", {
        email: formData.email,
      });
      if (response.status === 200) {
        setOtpSent(true);
        alert("OTP sent successfully! Please check your email.");

        let timeLeft = 60;
        setTimer(timeLeft);
        const countdown = setInterval(() => {
          timeLeft -= 1;
          setTimer(timeLeft);

          if (timeLeft <= 0) {
            clearInterval(countdown);
            setIsSendingOtp(false); 
            setInitialRequestMessage(""); 
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Failed to send OTP. Please check your email.");
      setIsSendingOtp(false);
      setInitialRequestMessage(""); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setErrorMessage("Please send OTP first.");
      return;
    }

    try {
      const response = await axios.post("/otp/loginByOtp", formData);
      const token = response.data.token;
      localStorage.setItem("token", token);
      login();
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Invalid OTP. Please try again.");
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
          <h1>Sign In with OTP</h1>
          <p className="to-access">Log in to access your dashboard.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="email"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              id="otp"
              placeholder=" "
              onChange={handleChange}
              disabled={!otpSent}
            />
            <label htmlFor="otp">OTP</label>
            <button
              type="button"
              id="sendOtp"
              onClick={handleSendOtp}
              disabled={otpSent || isSendingOtp || timer > 0}
            >
              {isSendingOtp
                ? "Sending OTP..."
                : otpSent
                ? `Resend OTP (${timer}s)`
                : "Send OTP"}
            </button>
          </div>

          <button type="submit" disabled={!otpSent}>
            Sign In
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {initialRequestMessage && (
            <p className="initial-request-message">{initialRequestMessage}</p>
          )}

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
