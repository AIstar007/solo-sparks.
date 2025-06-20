import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";

    try {
      const response = await axios.post(url, form);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isRegistering ? "Register" : "Login"} to Solo Sparks</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {isRegistering && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            style={styles.input}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isRegistering ? "Sign Up" : "Login"}
        </button>
        <p style={{ marginTop: "10px" }}>
          {isRegistering ? "Already have an account?" : "Need an account?"}
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            style={styles.link}
          >
            {isRegistering ? " Login" : " Register"}
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "400px",
    margin: "auto",
    marginTop: "100px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    marginLeft: "5px",
    textDecoration: "underline",
  },
};

export default LoginPage;
