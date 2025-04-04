import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket from "../components/useWebSocket";
import { Star, TrendingUp, TrendingDown, MoreHorizontal, ArrowUp, ArrowDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import StarBackground from '../components/StarBackground';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table.jsx";
import BG from '../assets/BgInferno.svg';

const Stocklist = () => {
    const navigate = useNavigate();
    const socketRef = useWebSocket("track");
    const [stocks, setStocks] = useState([]);
    const [favorites, setFavorites] = useState(new Set());

    // Initialize with your stock data structure
    useEffect(() => {
        // This should match what your backend initially sends
        const initialStocks = [
            // Example structure - replace with your actual tickers
            { symbol: "AAPL", name: "Apple Inc." },
            { symbol: "MSFT", name: "Microsoft Corp." }
        ].map((stock, index) => ({
            id: index + 1,
            symbol: stock.symbol,
            name: stock.name,
            logo: `https://placehold.co/36x36/gray/white?text=${stock.symbol.charAt(0)}`,
            price: "N/A",
            open: "N/A",
            high: "N/A",
            low: "N/A",
            volume: "N/A",
            change24h: "0.00%",
            change24hUp: true
        }));

        setStocks(initialStocks);
    }, []);

    const toggleFavorite = (id, e) => {
        e.stopPropagation();
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
            return newFavorites;
        });
    };

    const handleStockClick = (symbol) => {
        navigate(`/stock/${symbol}`);
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-background"
            style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            
            <StarBackground />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
                <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-800">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-800">
                                    <TableHead className="text-gray-400 w-12">#</TableHead>
                                    <TableHead className="text-gray-400">Name</TableHead>
                                    <TableHead className="text-gray-400 text-right">Price</TableHead>
                                    <TableHead className="text-gray-400 text-right">24H</TableHead>
                                    <TableHead className="text-gray-400 text-right">Volume</TableHead>
                                    <TableHead className="text-gray-400 text-right">Last 7 days</TableHead>
                                    <TableHead className="text-gray-400 text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {stocks.map((stock, index) => (
                                    <TableRow 
                                        key={stock.id} 
                                        className="border-gray-800 hover:bg-gray-900/50 cursor-pointer"
                                        onClick={() => handleStockClick(stock.symbol)}
                                    >
                                        <TableCell className="flex items-center space-x-2">
                                            <button 
                                                onClick={(e) => toggleFavorite(stock.id, e)}
                                                className="focus:outline-none hover:scale-110 transition-transform"
                                            >
                                                <Star 
                                                    className={`h-5 w-5 ${favorites.has(stock.id) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600 hover:text-yellow-400'}`} 
                                                />
                                            </button>
                                            <span className="text-gray-400">{index + 1}</span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <div className="h-8 w-8 rounded-full bg-white/10 p-1 flex items-center justify-center">
                                                    <img 
                                                        src={stock.logo} 
                                                        alt={stock.name} 
                                                        className="h-6 w-6 rounded-full" 
                                                        onError={(e) => { e.target.src = 'https://placehold.co/36x36/gray/white?text=?'; }}
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white">{stock.name}</div>
                                                    <div className="text-xs text-gray-400">{stock.symbol}</div>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-right font-medium text-white">
                                            <span id={`${stock.symbol}_price`}>{stock.price}</span>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <span id={`${stock.symbol}_open`} className="hidden">{stock.open}</span>
                                            <span id={`${stock.symbol}_high`} className="hidden">{stock.high}</span>
                                            <span id={`${stock.symbol}_low`} className="hidden">{stock.low}</span>
                                            <div className={`flex items-center justify-end ${stock.change24hUp ? 'text-green-500' : 'text-red-500'}`}>
                                                {stock.change24hUp ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                                                <span id={`${stock.symbol}_change`}>{stock.change24h}</span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-right text-white">
                                            <span id={`${stock.symbol}_vol`}>{stock.volume}</span>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <div className="h-10 w-32 flex items-center justify-center">
                                                {stock.change24hUp ? (
                                                    <TrendingUp className="text-green-500 h-6 w-6" />
                                                ) : (
                                                    <TrendingDown className="text-red-500 h-6 w-6" />
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <button 
                                                className="p-1.5 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stocklist;