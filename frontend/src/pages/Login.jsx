import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      console.log(res.data);

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || error.message || "Something went wrong"
      )
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-green-500 text-white p-2 rounded">
          Login
        </button>

        <p className="mt-4 text-center">
          Don’t have an account?
          <Link to="/register" className="text-blue-500 ml-1">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;