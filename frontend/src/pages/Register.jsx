import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from './SignupValidation'

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/backend/auth/register", inputs);
      console.log(res)
      navigate("/");
    } catch (err) {
      console.log(err)
      setError(err.response.data);
    }
  };



  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="firstname"
          name="firstname"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="lastname"
          name="lastname"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
       
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
