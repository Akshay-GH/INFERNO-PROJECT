"use client";

import { useState, useEffect } from "react";
import { Search, Trophy, ArrowUp, User } from "lucide-react";
import BG from "../assets/BgInferno.svg";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("Overall");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [topThree, setTopThree] = useState([]);

 
// const getCsrfToken = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/get_csrf/", {
//           method: "GET",
//           credentials: "include", // Essential for cookies
//         });
  
//         if (!response.ok) {
//           throw new Error("Failed to fetch CSRF token");
//         }
  
//         // The cookie is automatically stored by the browser
//         const data = await response.json();
//         return data.csrfToken;
//       } catch (error) {
//         console.error("CSRF Token Error:", error);
//         return null;
//       }
//     };
  const fetchLeaderboard = async () => {

    
    try {
      const response = await fetch("http://127.0.0.1:8000/leaderboard/", {
        method: "GET",
        credentials: "include",
        // headers: {
        //   "Content-Type": "application/json",
        //   "X-CSRFToken": getCsrfToken(),
        // },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log("Raw API Response:", data); // 🔥 Check what is actually received
  
      if (!data.leaderboard_data || !Array.isArray(data.leaderboard_data)) {
        throw new Error("Invalid response format");
      }
  
      setLeaderboardData(data.leaderboard_data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error.message);
    }
  };
  

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 50000); // Auto-refresh every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-background"
      style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <main className="container mx-auto px-13 py-8 pt-26 text-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
          <p className="text-white">See how you rank against other traders</p>
        </div>

        {/* Tabs and Search Bar */}
         <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* <div className="flex space-x-2 rounded-lg bg-gray-800 p-1 text-white">
            {["Overall", "Daily", "Weekly", "Monthly"].map((tab) => (
              <button
                key={tab}
                className={rounded-md px-4 py-2 ${activeTab === tab ? "bg-gray-700" : "hover:bg-gray-700/50"}}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div> */} 

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search traders..."
              className="w-64 rounded-lg bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Top 3 Traders */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-white">
          {topThree.map((trader, index) => (
            <div
              key={index}
              className={`relative rounded-xl border ${
                index === 0 ? "border-blue-500 bg-blue-900/10" : "border-gray-800 bg-gray-850"
              } p-6 text-center`}
            >
              <div
                className={`absolute right-4 top-4 rounded-full ${
                  index === 0 ? "bg-blue-500" : index === 1 ? "bg-blue-600" : "bg-blue-700"
                } px-3 py-1 text-xs font-medium`}
              >
                <div className="flex items-center">
                  <Trophy className="mr-1 h-3 w-3" />
                  {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}
                </div>
              </div>

              <div className="mb-4 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20">
                  <User className="h-10 w-10 text-blue-400" />
                </div>
              </div>

              <h3 className="mb-2 text-xl font-bold">{trader.username}</h3>
              <p className="mb-4 text-3xl font-bold">${trader.total_profit.toLocaleString()}</p>

              <div className="inline-flex items-center rounded-full bg-green-900/30 px-3 py-1 text-sm text-green-400">
                <ArrowUp className="mr-1 h-4 w-4" />+{trader.total_profit.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>

        {/* Top Traders Table */}
        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-850 p-6">
          <h2 className="mb-6 text-xl font-bold">Top Traders</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  <th className="pb-4 pl-4 pr-6 text-gray-400">Rank</th>
                  <th className="px-6 pb-4 text-gray-400">Trader</th>
                  <th className="px-6 pb-4 text-gray-400">Total Profit</th>
                  <th className="px-6 pb-4 text-gray-400">Gain %</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((trader, index) => (
                  <tr key={trader.username} className="border-b border-gray-800">
                    <td className="py-4 pl-4 pr-6 font-medium text-blue-400">{index + 1}</td>
                    <td className="px-6 py-4 flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                        <User className="h-4 w-4 text-blue-400" />
                      </div>
                      <span className="ml-3 font-medium">{trader.username}</span>
                    </td>
                    <td className="px-6 py-4 font-medium">${trader.total_profit.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center rounded-full bg-green-900/30 px-3 py-1 text-xs font-medium text-green-400 w-fit">
                        <ArrowUp className="mr-1 h-3 w-3" />+{trader.total_profit.toFixed(2)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}