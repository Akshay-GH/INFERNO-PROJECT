"use client"

import { useState } from "react"
import { TrendingUp, Search, Filter, ArrowUpDown, MoreVertical, DollarSign } from "lucide-react"
import BG from '../assets/BgInferno.svg';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All Holdings")

  const holdings = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      qty: 15,
      avgPrice: 150.25,
      currentPrice: 187.82,
      value: 2817.3,
      pnl: 563.55,
      pnlPercent: 25.01,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      qty: 5,
      avgPrice: 175.35,
      currentPrice: 169.95,
      value: 849.75,
      pnl: -27.0,
      pnlPercent: -3.08,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      qty: 8,
      avgPrice: 135.75,
      currentPrice: 142.5,
      value: 1140.0,
      pnl: 54.0,
      pnlPercent: 4.97,
    },
    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      qty: 10,
      avgPrice: 145.5,
      currentPrice: 155.45,
      value: 1554.5,
      pnl: 99.5,
      pnlPercent: 6.84,
    },
  ]

  return (
    <div className="px-12 pt-26  "
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
            <h3 className="text-3xl font-bold text-white">$28,675.98</h3>
          </div>

          <div>
            <p className="text-white">Total P&L</p>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-green-400">+$2,563.78</span>
              <div className="ml-2 flex items-center rounded-full bg-green-900/30 px-2 py-1 text-xs text-green-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                9.82%
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
              <tr className="border-b border-gray-800 text-left ">
                <th className="pb-4 pl-4 pr-6 text-white">Symbol</th>
                <th className="px-6 pb-4 text-white">Qty</th>
                <th className="px-6 pb-4 text-white">Avg Price</th>
                <th className="px-6 pb-4 text-white">Current Price</th>
                <th className="px-6 pb-4 text-white">Value</th>
                <th className="px-6 pb-4 text-white">P&L</th>
                <th className="px-6 pb-4 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr key={holding.symbol} className="border-b border-gray-800 text-white">
                  <td className="py-4 pl-4 pr-6">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{holding.symbol}</div>
                        <div className="text-sm text-gray-400">{holding.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{holding.qty}</td>
                  <td className="px-6 py-4">${holding.avgPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">${holding.currentPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">${holding.value.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className={`flex flex-col ${holding.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                      <span>
                        {holding.pnl >= 0 ? "+" : ""}
                        {holding.pnl.toFixed(2)}
                      </span>
                      <span className="text-sm">
                        {holding.pnl >= 0 ? "+" : ""}
                        {holding.pnlPercent.toFixed(2)}%
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

