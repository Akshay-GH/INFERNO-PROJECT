"use client"

import { useState } from "react"
import { Search, Trophy, ArrowUp, User } from "lucide-react"
import BG from '../assets/BgInferno.svg';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("Overall")

  const topTraders = [
    {
      id: 1,
      name: "TradeKing",
      value: 113576.62,
      gain: 13.58,
      trades: 24,
      winRate: 61,
    },
    {
      id: 2,
      name: "StockWhisperer",
      value: 115356.27,
      gain: 15.36,
      trades: 18,
      winRate: 75,
    },
    {
      id: 3,
      name: "MarketMaven",
      value: 109872.45,
      gain: 12.87,
      trades: 32,
      winRate: 58,
    },
    {
      id: 4,
      name: "InvestorPro",
      value: 108456.78,
      gain: 11.92,
      trades: 27,
      winRate: 63,
    },
    {
      id: 5,
      name: "WealthBuilder",
      value: 107234.56,
      gain: 10.45,
      trades: 21,
      winRate: 67,
    },
  ]

  const topThree = [
    {
      rank: 2,
      name: "ValueSeeker",
      value: 123197.64,
      gain: 23.2,
    },
    {
      rank: 1,
      name: "BogleHead",
      value: 124671.26,
      gain: 24.67,
    },
    {
      rank: 3,
      name: "TrendTrader",
      value: 122825.99,
      gain: 22.83,
    },
  ]

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background"
                style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>

     <main className="container mx-auto px-13 py-8  pt-26 text-white" >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
        <p className="text-white">See how you rank against other traders</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex space-x-2 rounded-lg bg-gray-800 p-1 text-white">
          {["Overall", "Daily", "Weekly", "Monthly"].map((tab) => (
            <button
              key={tab}
              className={`rounded-md px-4 py-2 ${activeTab === tab ? "bg-gray-700" : "hover:bg-gray-700/50"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

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
        {topThree.map((trader) => (
          <div
            key={trader.rank}
            className={`relative rounded-xl border ${
              trader.rank === 1 ? "border-blue-500 bg-blue-900/10" : "border-gray-800 bg-gray-850"
            } p-6 text-center`}
          >
            <div
              className={`absolute right-4 top-4 rounded-full ${
                trader.rank === 1 ? "bg-blue-500" : trader.rank === 2 ? "bg-blue-600" : "bg-blue-700"
              } px-3 py-1 text-xs font-medium`}
            >
              <div className="flex items-center">
                <Trophy className="mr-1 h-3 w-3" />
                {trader.rank === 1 ? "1st" : trader.rank === 2 ? "2nd" : "3rd"}
              </div>
            </div>

            <div className="mb-4 flex justify-center">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full ${
                  trader.rank === 1 ? "bg-blue-500/30" : "bg-blue-500/20"
                }`}
              >
                <User className={`h-10 w-10 ${trader.rank === 1 ? "text-blue-400" : "text-blue-500"}`} />
              </div>
            </div>

            <h3 className="mb-2 text-xl font-bold">{trader.name}</h3>
            <p className="mb-4 text-3xl font-bold">${trader.value.toLocaleString()}</p>

            <div className="inline-flex items-center rounded-full bg-green-900/30 px-3 py-1 text-sm text-green-400">
              <ArrowUp className="mr-1 h-4 w-4" />+{trader.gain.toFixed(2)}%
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
                <th className="pb-4 pl-4 pr-6 text-gray-400">
                  <div className="flex items-center">
                    Rank
                    <ArrowUp className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 pb-4 text-gray-400">Trader</th>
                <th className="px-6 pb-4 text-gray-400">Portfolio Value</th>
                <th className="px-6 pb-4 text-gray-400">Gain %</th>
                <th className="px-6 pb-4 text-gray-400">Trades</th>
                <th className="px-6 pb-4 text-gray-400">Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {topTraders.map((trader, index) => (
                <tr key={trader.id} className="border-b border-gray-800">
                  <td className="py-4 pl-4 pr-6">
                    <div className="flex items-center">
                      <span className="mr-2 font-medium text-blue-400">{index + 1}</span>
                      <ArrowUp className="h-3 w-3 text-green-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                        <User className="h-4 w-4 text-blue-400" />
                      </div>
                      <span className="ml-3 font-medium">{trader.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">${trader.value.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center rounded-full bg-green-900/30 px-3 py-1 text-xs font-medium text-green-400 w-fit">
                      <ArrowUp className="mr-1 h-3 w-3" />+{trader.gain.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4">{trader.trades}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-2">{trader.winRate}%</span>
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-700">
                        <div className="h-full bg-blue-500" style={{ width: `${trader.winRate}%` }}></div>
                      </div>
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
  )
}

