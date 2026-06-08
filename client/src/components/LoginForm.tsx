import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
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
      email: "",
      password: "",
    };

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Please enter a valid email";
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
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      onLogin();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
  <div className="login-page">
    <div className="login-card">

      <div className="login-header">
        <h1>Student CMS</h1>
        <p>Secure Student Management System</p>
      </div>

      <form onSubmit={handleSubmit}>
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

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

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
          Login
        </button>
      </form>

    </div>
  </div>
);
};

export default LoginForm;