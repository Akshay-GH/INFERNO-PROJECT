import { Bell, TrendingUp, Clock, BarChart2, Trophy, ExternalLink } from "lucide-react"
import Navbar from "../components/Navbar"
import BG from '../assets/BgInferno.svg';

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white"
     style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      {/* Navigation Bar */}
      <Navbar />

      {/* Star Background */}

      {/* Main Content */}
      <main className="container mx-auto px-13 py-8  pt-26">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's an overview of your portfolio.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Portfolio Summary - Takes 3 columns */}
          <div className="rounded-xl border border-gray-800 bg-gray-850 p-6 lg:col-span-3">
            <h2 className="mb-4 text-xl font-bold">Portfolio Summary</h2>
            <p className="mb-4 text-gray-400">Your current investment overview</p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Total Value */}
              <div>
                <p className="text-gray-400">Total Value</p>
                <h3 className="mb-1 text-3xl font-bold">$28,456.72</h3>
                <div className="flex items-center">
                  <div className="flex items-center rounded-full bg-green-900/30 px-2 py-1 text-xs text-green-400">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    8.12%
                  </div>
                  <span className="ml-2 text-green-400">+$2,134.52</span>
                </div>
              </div>

              {/* Today's Change */}
              <div>
                <p className="text-gray-400">Today's Change</p>
                <h3 className="mb-1 text-3xl font-bold">+$456.72</h3>
                <div className="flex items-center">
                  <div className="flex items-center rounded-full bg-green-900/30 px-2 py-1 text-xs text-green-400">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    1.63%
                  </div>
                </div>
              </div>

              {/* Asset Allocation */}
              <div>
                <p className="text-gray-400">Asset Allocation</p>
                <div className="mt-2 space-y-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <span>Stocks (68%)</span>
                      <span>$19,350.57</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-700">
                      <div className="h-full w-[68%] bg-blue-500"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span>ETFs (22%)</span>
                      <span>$6,260.48</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-700">
                      <div className="h-full w-[22%] bg-blue-500"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span>Cash (10%)</span>
                      <span>$2,845.67</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-700">
                      <div className="h-full w-[10%] bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="rounded-xl border border-gray-800 bg-gray-850 p-6">
            <h2 className="mb-4 text-xl font-bold">Recent Alerts</h2>
            <p className="mb-4 text-gray-400">Important updates from your watchlist</p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-blue-500/20 p-2 text-blue-400">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold">AAPL up by 2.5%</h4>
                  <p className="text-sm text-gray-400">Apple Inc. shares rose by 2.5% in the last hour</p>
                  <p className="mt-1 text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-blue-500/20 p-2 text-blue-400">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold">TSLA hit target price</h4>
                  <p className="text-sm text-gray-400">Tesla Inc. reached your target price of $900</p>
                  <p className="mt-1 text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-blue-500/20 p-2 text-blue-400">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold">Market opening soon</h4>
                  <p className="text-sm text-gray-400">US markets will open in 30 minutes</p>
                  <p className="mt-1 text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Portfolio Card */}
          <div className="relative rounded-xl border border-gray-800 bg-gray-850 p-6">
            <div className="mb-4 rounded-full bg-blue-500/20 p-3 text-blue-400 w-fit">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Portfolio</h3>
            <p className="text-gray-400">Manage your investments</p>
            <button className="absolute right-4 top-4 text-gray-400 hover:text-white">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>

          {/* Stock Charts Card */}
          <div className="relative rounded-xl border border-gray-800 bg-gray-850 p-6">
            <div className="mb-4 rounded-full bg-blue-500/20 p-3 text-blue-400 w-fit">
              <BarChart2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Stock Charts</h3>
            <p className="text-gray-400">Analyze market trends</p>
            <button className="absolute right-4 top-4 text-gray-400 hover:text-white">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>

          {/* Order History Card */}
          <div className="relative rounded-xl border border-gray-800 bg-gray-850 p-6">
            <div className="mb-4 rounded-full bg-blue-500/20 p-3 text-blue-400 w-fit">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Order History</h3>
            <p className="text-gray-400">View your past transactions</p>
            <button className="absolute right-4 top-4 text-gray-400 hover:text-white">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>

          {/* Leaderboard Card */}
          <div className="relative rounded-xl border border-gray-800 bg-gray-850 p-6">
            <div className="mb-4 rounded-full bg-blue-500/20 p-3 text-blue-400 w-fit">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Leaderboard</h3>
            <p className="text-gray-400">See top performing traders</p>
            <button className="absolute right-4 top-4 text-gray-400 hover:text-white">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Market Indices and Top Performers */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Market Indices - Takes 3 columns */}
          <div className="rounded-xl border border-gray-800 bg-gray-850 p-6 lg:col-span-3">
            <h2 className="text-xl font-bold">Market Indices</h2>
            {/* Market indices content would go here */}
          </div>

          {/* Top Performers */}
          <div className="rounded-xl border border-gray-800 bg-gray-850 p-6">
            <h2 className="text-xl font-bold">Top Performers</h2>
            {/* Top performers content would go here */}
          </div>
        </div>
      </main>
    </div>
  )
}

