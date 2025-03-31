import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputComponent from "../components/InputComponent";
import BG from "../assets/BgInferno.svg";



export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Reset error message
    setError("");
    // console.log(formData);
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://20.193.151.222:8000/", { // Added /register/ endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message) {
          // Handle Django messages
          setError(errorData.message);
        } else {
          setError("Registration failed. Please try again.");
        }
        return;
      }

      // If registration is successful, navigate to login
      navigate("/signin");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-96 backdrop-blur-sm">
        <Heading heading="Sign Up" className="text-white" />
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 flex flex-col items-center">
          <div className="text-left w-full">
            <label className="block text-gray-300 font-medium mb-1">First Name</label>
            <InputComponent
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="text-left w-full">
            <label className="block text-gray-300 font-medium mb-1">Last Name</label>
            <InputComponent
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="text-left w-full">
            <label className="block text-gray-300 font-medium mb-1">Username</label>
            <InputComponent
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="text-left w-full">
            <label className="block text-gray-300 font-medium mb-1">Email ID</label>
            <InputComponent
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="text-left w-full">
            <label className="block text-gray-300 font-medium mb-1">Password</label>
            <InputComponent
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="text-left w-full">
            <label className="block text-gray-300 font-medium mb-1">Confirm Password</label>
            <InputComponent
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <Button
            type="submit"
            text="Submit"
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </form>
      </div>
    </div>
  );
}