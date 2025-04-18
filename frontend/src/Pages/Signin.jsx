import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputComponent from "../components/InputComponent";
import BG from "../assets/BgInferno.svg";

export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // async function getCsrfToken() {
  //   // Check if CSRF token is already stored
  //   let csrfToken = localStorage.getItem("csrfToken");
    
  //   console.log("fetching", csrfToken)
  //   if (!csrfToken) {
  //     // If not available, fetch it from the backend
  //     const response = await fetch("http://127.0.0.1:8000/get_csrf/", {
  //       credentials: "include",
  //     });
  //     console.log(response)
  //     if (response.ok) {
  //       const data = await response.json();
  //       csrfToken = data.csrfToken;
  //       // Store CSRF token in localStorage for future use
  //       localStorage.setItem("csrfToken", csrfToken);
  //     } else {
  //       console.error("Failed to fetch CSRF token");
  //       return null;
  //     }
  //   }

  //   return csrfToken;
  // }

  const handleSubmit = async () => {
    setError(null);
    console.log("Logging in with:", username, email, password);
    // const csrfToken = await getCsrfToken();

    // if (!csrfToken) {
    //   console.error("CSRF token missing, login aborted.");
    //   return;
    // }
    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          // "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ username, email, password }), // Sending required fields
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Invalid login credentials");
      }

      localStorage.setItem("token", data.token || "dummy_token"); // Ensure token storage
      navigate("/landing");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-96 backdrop-blur-sm">
        <Heading heading="Sign In" className="text-white" />
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4 space-y-4 flex flex-col items-center">
          <div className="w-full">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Username
            </label>
            <InputComponent
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Email ID
            </label>
            <InputComponent
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Password
            </label>
            <InputComponent
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
            />
          </div>

          <Button
            text="Submit"
            onClick={handleSubmit}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </div>
  );
}
