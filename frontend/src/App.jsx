

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import StarBackground from "./components/StarBackground";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Landing from "./pages/Landing";
import Stocklist from "./pages/Stocklist";
import StockChart from "./Pages/StockChart";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import OrderHistory from "./pages/OrderHistory";
import Leaderboard from "./pages/Leaderboard";



function App() {
  const location = useLocation(); // Get the current route

  // Hide Navbar for Signin and Signup pages
  const hideNavbar = location.pathname === "/" || location.pathname === "/signin";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <StarBackground />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/stocklist" element={<Stocklist />} />
        <Route path="/stockchart" element={<StockChart />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
       


        
      </Routes>
    </>
  );
}

// Wrap App in BrowserRouter in index.js or main.jsx
export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

