import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../components/common/Button";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend authentication will be connected later.
    navigate("/profile");
  };

  return (
    <div className="auth-page section">

      <div className="auth-card">

        <span className="section-label">
          CHRONOVA / ACCOUNT
        </span>

        <h1>
          Welcome back.
        </h1>

        <p>
          Enter your details to access your account.
        </p>

        <form onSubmit={handleSubmit}>

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

          <Button
            type="submit"
            fullWidth
          >
            Sign In
          </Button>

        </form>

        <div className="auth-footer">
          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create Account
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Login;