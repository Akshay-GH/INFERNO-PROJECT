"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Search, Filter, ArrowUpDown, MoreVertical, DollarSign } from "lucide-react"
import BG from '../assets/BgInferno.svg';
// import { useSession } from "next-auth/react"; // If using NextAuth.js

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All Holdings")
  const [portfolioData, setPortfolioData] = useState({})
  const [totalValue, setTotalValue] = useState(0)
  const [totalPnL, setTotalPnL] = useState(0)
  const [totalPnLPercent, setTotalPnLPercent] = useState(0)
  
  // If using NextAuth.js for session management
  // const { data: session } = useSession();

  // Function to fetch live portfolio data with credentials
  const fetchLivePrices = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/get_live_prices/', {
        credentials: 'include', // This sends cookies with the request
        headers: {
          'Content-Type': 'application/json',
          // If using token-based auth:
          // ...(session?.accessToken && { 
          //   'Authorization': `Bearer ${session.accessToken}` 
          // }),
          // // If using CSRF token:
          // 'X-CSRFToken': getCSRFToken(), // Add function to get CSRF token
        }
      })
      
      if (!response.ok) throw new Error('Network error')
      const data = await response.json()
      
      setPortfolioData(data)
      
      // Calculate totals
      let valueSum = 0
      let pnlSum = 0
      let costSum = 0
      
      Object.values(data).forEach(stock => {
        valueSum += stock.total_value || 0
        pnlSum += stock.profit_loss || 0
        costSum += (stock.average_price * stock.quantity) || 0
      })
      
      setTotalValue(valueSum)
      setTotalPnL(pnlSum)
      setTotalPnLPercent(costSum > 0 ? (pnlSum / costSum) * 100 : 0)
      
    } catch (error) {
      console.error('Error fetching live prices:', error)
      // Optionally redirect to login if unauthorized
      if (error.message.includes('401')) {
        window.location.href = '/login'
      }
    }
  }

  

  // Set up polling for live prices
  useEffect(() => {
    fetchLivePrices() // Initial fetch
    const interval = setInterval(fetchLivePrices, 1000) // Update every second
    
    return () => clearInterval(interval) // Clean up on unmount
  }, []) // Re-run if session changes

  // ... rest of your component remains the same ...

  return (
    <div className="px-12 pt-26"
       style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="mb-8 mx-auto px-3">
        <h1 className="text-3xl font-bold text-white">Portfolio</h1>
        <p className="text-gray-400">Manage and track your investments</p>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-850 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">Portfolio Summary</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <p className="text-white">Total Value</p>
            <h3 className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</h3>
          </div>

          <div>
            <p className="text-white">Total P&L</p>
            <div className="flex items-center">
              <span className={`text-3xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
              </span>
              <div className={`ml-2 flex items-center rounded-full px-2 py-1 text-xs ${totalPnL >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                <TrendingUp className={`mr-1 h-3 w-3 ${totalPnL >= 0 ? '' : 'rotate-180'}`} />
                {totalPnL >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600">
              Deposit
            </button>
            <button className="rounded-lg border border-gray-700 bg-transparent px-6 py-3 font-medium text-white hover:bg-gray-800">
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-800 bg-gray-850 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">Holdings</h2>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-2 rounded-lg bg-gray-800 p-1 text-white">
            {["All Holdings", "Stocks", "ETFs"].map((tab) => (
              <button
                key={tab}
                className={`rounded-md px-4 py-2 ${activeTab === tab ? "bg-gray-700" : "hover:bg-gray-700/50"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search symbols..."
                className="w-64 rounded-lg bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="rounded-lg bg-gray-800 p-2 hover:bg-gray-700">
              <Filter className="h-5 w-5 text-gray-400" />
            </button>
            <button className="rounded-lg bg-gray-800 p-2 hover:bg-gray-700">
              <ArrowUpDown className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                <th className="pb-4 pl-4 pr-6 text-white">Stock</th>
                <th className="px-6 pb-4 text-white">Quantity</th>
                <th className="px-6 pb-4 text-white">Avg Price</th>
                <th className="px-6 pb-4 text-white">Current Price</th>
                <th className="px-6 pb-4 text-white">Total Value</th>
                <th className="px-6 pb-4 text-white">Profit/Loss</th>
                <th className="px-6 pb-4 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(portfolioData).length > 0 ? (
                Object.entries(portfolioData).map(([stock, details]) => (
                  <tr key={stock} className="border-b border-gray-800 text-white">
                    <td className="py-4 pl-4 pr-6">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div className="ml-3 font-medium">{stock}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{details.quantity}</td>
                    <td className="px-6 py-4">${details.average_price?.toFixed(2)}</td>
                    <td className="px-6 py-4">${details.live_price?.toFixed(2)}</td>
                    <td className="px-6 py-4">${details.total_value?.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className={`flex flex-col ${details.profit_loss >= 0 ? "text-green-400" : "text-red-400"}`}>
                        <span>
                          {details.profit_loss >= 0 ? "+" : ""}
                          {details.profit_loss?.toFixed(2)}
                        </span>
                        <span className="text-sm">
                          ({details.profit_loss >= 0 ? "+" : ""}
                          {details.profit_loss_percentage?.toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="rounded-lg bg-blue-500 px-4 py-1 text-sm font-medium text-white hover:bg-blue-600">
                          Buy
                        </button>
                        <button className="rounded-lg border border-gray-700 bg-transparent px-4 py-1 text-sm font-medium text-white hover:bg-red-800">
                          Sell
                        </button>
                        <button className="rounded-lg border border-gray-700 bg-transparent p-1 text-gray-400 hover:bg-gray-800">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-400">
                    No holdings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}