import React, { useState } from "react";
import api from "../api";

const LoginPage = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "student",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!form.email) {
      setError("Email is required to send OTP.");
      return;
    }

    try {
      const res = await api.post("/auth/send-otp", { email: form.email });
      if (res.data.success) {
        setOtpSent(true);
        setInfo("OTP sent to your email. Please check inbox/spam.");
      } else {
        setError(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send OTP. Try again."
      );
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const res = await api.post("/auth/verify-otp-register", {
        ...form,
        otp,
      });

      if (res.data.success) {
        onLogin(res.data.user);
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      if (res.data.success) {
        onLogin(res.data.user);
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login error");
    }
  };

  const resetRegisterFlow = () => {
    setIsRegister((prev) => !prev);
    setOtpSent(false);
    setOtp("");
    setError("");
    setInfo("");
  };

  return (
    <div className="center-page">
      <div className="card auth-card">
        <h2 className="title">
          {isRegister ? "Create Account" : "Login"} – Campus Cab
        </h2>
        <p className="subtitle">Thapar E-Rickshaw Service</p>

        {error && <div className="alert">{error}</div>}
        {info && <div className="info-box success">{info}</div>}

        <form
          className="form"
          onSubmit={
            isRegister
              ? otpSent
                ? handleVerifyAndRegister
                : handleSendOtp
              : handleLogin
          }
        >
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={otpSent}
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                disabled={otpSent}
              />

              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={form.role === "student"}
                    onChange={handleChange}
                    disabled={otpSent}
                  />
                  Student
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="rider"
                    checked={form.role === "rider"}
                    onChange={handleChange}
                    disabled={otpSent}
                  />
                  Rider (E-Rickshaw)
                </label>
              </div>
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={otpSent && isRegister}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={otpSent && isRegister}
          />

          {isRegister && otpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
          )}

          <button className="btn btn-primary" type="submit">
            {isRegister
              ? otpSent
                ? "Verify OTP & Create Account"
                : "Send OTP"
              : "Login"}
          </button>
        </form>

        <button className="link-btn" onClick={resetRegisterFlow}>
          {isRegister
            ? "Already have an account? Login"
            : "New here? Create account"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
