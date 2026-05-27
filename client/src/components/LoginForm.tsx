import { useState } from "react";

const LoginForm = () => {
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

    // email validation
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter valid email";

      valid = false;
    }

    // password validation
    if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";

      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) return;

    alert("Login Successful");
  };

  return (
    <div className="form-container">
      <h2>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
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

          <div>
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
        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;