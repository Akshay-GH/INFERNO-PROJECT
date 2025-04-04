import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from '../components/useWebSocket';
import Navbar from '../components/Navbar';
import StarBackground from '../components/StarBackground';
import BG from '../assets/BgInferno.svg';

const Stocklist = () => {
    const navigate = useNavigate();
    const socketRef = useWebSocket("track");
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const queryString = window.location.search;
                console.log("Query String oj:", queryString);

                const response = await fetch(`http://127.0.0.1:8000/stocktracker/?stock_picker=AAPL&stock_picker=GOOGL&stock_picker=AMZN&stock_picker=MSFT&stock_picker=TSLA&stock_picker=NVDA&stock_picker=META&stock_picker=NFLX`, {
                    method: "GET",
                    credentials: 'include', // This sends cookies
                    headers: {
                        'Content-Type': 'application/json',
                        // 'X-CSRFToken': getCookie('csrftoken') || '',
                    }
                });
                

                if (response.status === 401) {
                    navigate('/login');
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Full response JSON:", data);
                const initialStocks = Object.entries(data.data).map(([ticker, details], index) => ({
                    id: index + 1,
                    ticker,
                    close: details.close,
                    open: details.open,
                    high: details.high,
                    low: details.low,
                    volume: details.volume
                }));

                setStocks(initialStocks);
            } catch (error) {
                console.error("Error fetching initial data:", error);
                if (error.message.includes('401')) {
                    navigate('/login');
                }
            }
        };

        fetchInitialData();
    }, [navigate]);

    return (
        <div className="min-h-screen w-full overflow-x-hidden"
            style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            
            <StarBackground />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
                <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-800">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-white">Live Stock Tracker</h1>
                        <button 
                            onClick={() => navigate('/chart')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                        >
                            Buy/Sell
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="py-3 px-4 text-left text-gray-400 font-medium">SNo.</th>
                                    <th className="py-3 px-4 text-left text-gray-400 font-medium">Stock</th>
                                    <th className="py-3 px-4 text-left text-gray-400 font-medium">Price</th>
                                    <th className="py-3 px-4 text-left text-gray-400 font-medium">Open</th>
                                    <th className="py-3 px-4 text-left text-gray-400 font-medium">High</th>
                                    <th className="py-3 px-4 text-left text-gray-400 font-medium">Low</th>
                                    <th className="py-3 px-4 text-left text-gray-400 font-medium">Volume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stocks.map((stock) => (
                                    <tr 
                                        key={stock.ticker} 
                                        id={`row-${stock.ticker}`}
                                        className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-gray-300">{stock.id}</td>
                                        <td className="py-3 px-4 font-medium text-white">{stock.ticker}</td>
                                        <td 
                                            id={`${stock.ticker}_price`} 
                                            className="py-3 px-4 font-medium"
                                            data-prev-value={stock.close}
                                        >
                                            {stock.close}
                                        </td>
                                        <td id={`${stock.ticker}_open`} className="py-3 px-4 text-gray-300">{stock.open}</td>
                                        <td id={`${stock.ticker}_high`} className="py-3 px-4 text-gray-300">{stock.high}</td>
                                        <td id={`${stock.ticker}_low`} className="py-3 px-4 text-gray-300">{stock.low}</td>
                                        <td id={`${stock.ticker}_vol`} className="py-3 px-4 text-gray-300">{stock.volume}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Stocklist;