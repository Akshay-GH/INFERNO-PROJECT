"use client"

import { useState } from "react"
import { Search, ArrowDown, ArrowUp, Calendar } from "lucide-react"
import BG from '../assets/BgInferno.svg';

export default function OrderHistory() {
    const [activeFilter, setActiveFilter] = useState("All")

    const orders = [
        {
            id: "ORD-1018",
            date: "Mar 29, 2025, 10:26 AM",
            symbol: "NVDA",
            type: "SELL",
            quantity: 7,
            price: 868.0,
            total: 6076.0,
            status: "COMPLETED",
        },
        {
            id: "ORD-1016",
            date: "Mar 29, 2025, 10:06 AM",
            symbol: "JPM",
            type: "SELL",
            quantity: 8,
            price: 711.0,
            total: 5688.0,
            status: "COMPLETED",
        },
        {
            id: "ORD-1033",
            date: "Mar 28, 2025, 3:28 PM",
            symbol: "AAPL",
            type: "BUY",
            quantity: 11,
            price: 828.0,
            total: 9108.0,
            status: "COMPLETED",
        },
        {
            id: "ORD-1012",
            date: "Mar 28, 2025, 2:22 PM",
            symbol: "TSLA",
            type: "BUY",
            quantity: 6,
            price: 809.0,
            total: 4854.0,
            status: "PROCESSING",
        },
        {
            id: "ORD-1010",
            date: "Mar 28, 2025, 2:05 PM",
            symbol: "TSLA",
            type: "BUY",
            quantity: 12,
            price: 466.0,
            total: 5592.0,
            status: "COMPLETED",
        },
        {
            id: "ORD-1046",
            date: "Mar 28, 2025, 11:27 AM",
            symbol: "AAPL",
            type: "BUY",
            quantity: 20,
            price: 758.0,
            total: 15160.0,
            status: "COMPLETED",
        },
        {
            id: "ORD-1027",
            date: "Mar 28, 2025, 11:04 AM",
            symbol: "JPM",
            type: "SELL",
            quantity: 6,
            price: 570.0,
            total: 3420.0,
            status: "PROCESSING",
        },
    ]

    const filteredOrders =
        activeFilter === "All" ? orders : orders.filter((order) => order.type === activeFilter.toUpperCase())

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-background"
            style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>

            <main className="container mx-auto px-13 py-8  pt-26">

                <div className="mb-8 px-13 ">
                    <h1 className="text-3xl font-bold text-white">Order History</h1>
                    <p className="text-white ">Track all your trading activity</p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-850 p-6 px-14">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Transaction History</h2>

                        <div className="flex space-x-2 rounded-lg bg-gray-800 p-1">
                            {["All", "Buy", "Sell"].map((filter) => (
                                <button
                                    key={filter}
                                    className={`rounded-md px-4 py-2 ${activeFilter === filter ? "bg-gray-700" : "hover:bg-gray-700/50"}`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by symbol or order ID..."
                                className="w-full rounded-lg bg-gray-800 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <button className="flex items-center justify-between rounded-lg bg-gray-800 px-4 py-3 text-gray-400 hover:bg-gray-700">
                                <span>All Statuses</span>
                                <ArrowDown className="ml-2 h-4 w-4" />
                            </button>
                            <button className="flex items-center justify-between rounded-lg bg-gray-800 px-4 py-3 text-gray-400 hover:bg-gray-700">
                                <span>All Time</span>
                                <ArrowDown className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800 text-left">
                                    <th className="pb-4 pl-4 pr-6 text-white">Order ID</th>
                                    <th className="px-6 pb-4 text-white">Date & Time</th>
                                    <th className="px-6 pb-4 text-white">Symbol</th>
                                    <th className="px-6 pb-4 text-white">Type</th>
                                    <th className="px-6 pb-4 text-white">Quantity</th>
                                    <th className="px-6 pb-4 text-white">Price</th>
                                    <th className="px-6 pb-4 text-white">Total</th>
                                    <th className="px-6 pb-4 text-white">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-800 text-white">
                                        <td className="py-4 pl-4 pr-6 font-medium">{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                                                {order.date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{order.symbol}</td>
                                        <td className="px-6 py-4">
                                            <div
                                                className={`flex items-center rounded-full px-3 py-1 text-xs font-medium ${order.type === "BUY" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                                                    }`}
                                            >
                                                {order.type === "BUY" ? (
                                                    <ArrowUp className="mr-1 h-3 w-3" />
                                                ) : (
                                                    <ArrowDown className="mr-1 h-3 w-3" />
                                                )}
                                                {order.type}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{order.quantity}</td>
                                        <td className="px-6 py-4">${order.price.toFixed(2)}</td>
                                        <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${order.status === "COMPLETED" ? "bg-green-900/30 text-green-400" : "bg-blue-900/30 text-blue-400"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
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

