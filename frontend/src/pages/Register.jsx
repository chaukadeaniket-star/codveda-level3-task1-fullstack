import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../components/common/Button";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    navigate("/profile");
  };

  return (
    <div className="auth-page section">

      <div className="auth-card">

        <span className="section-label">
          CHRONOVA / ACCOUNT
        </span>

        <h1>
          Create your account.
        </h1>

        <p>
          Join the Chronova world.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(event) =>
              setForm({
                ...form,
                name: event.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(event) =>
              setForm({
                ...form,
                email: event.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) =>
              setForm({
                ...form,
                password: event.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(event) =>
              setForm({
                ...form,
                confirmPassword: event.target.value,
              })
            }
            required
          />

          <Button
            type="submit"
            fullWidth
          >
            Create Account
          </Button>

        </form>

        <div className="auth-footer">
          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Sign In
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;