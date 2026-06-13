import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../styles/login.css";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let valid = true;

    const newErrors = {
      name: "",
      email: "",
      password: "",
    };

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Student CMS</h1>

          <p>Create your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && (
              <p className="error-text">
                {errors.name}
              </p>
            )}
          </div>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="error-text">
                {errors.email}
              </p>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {errors.password && (
              <p className="error-text">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Register
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;