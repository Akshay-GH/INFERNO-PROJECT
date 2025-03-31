 import { useState } from 'react';
import { Star, TrendingUp, TrendingDown, CircleDollarSign, BarChart, MoreHorizontal, ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StarBackground from '../components/StarBackground';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "../components/ui/table.jsx";
import BG from '../assets/BgInferno.svg';

const Stocklist = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([
    {
      id: 1,
      rank: 2,
      favorited: true,
      name: "Tether",
      symbol: "USDT",
      logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      price: "$1.00",
      change24h: "0.22%",
      change24hUp: true,
      change7d: "3.22%",
      change7dUp: false,
      marketCap: "$218,533,780",
      volume: "$5,763,203,118",
      chartData: "down",
    },
    {
      id: 2,
      rank: 1,
      favorited: true,
      name: "Bitcoin",
      symbol: "BTC",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      price: "$26,735.59",
      change24h: "5.12%",
      change24hUp: false,
      change7d: "1.12%",
      change7dUp: true,
      marketCap: "$23,621,421,545",
      volume: "$2,487,902,497",
      chartData: "up",
    },
    
      {    id: 3,
      rank: 8,
      favorited: true,
      name: "SushiSwap",
      symbol: "SUSHI",
      logo: "https://cryptologos.cc/logos/sushiswap-sushi-logo.png",
      price: "$0.8802",
      change24h: "0.6%",
      change24hUp: true,
      change7d: "3.60%",
      change7dUp: true,
      marketCap: "$8,050,630,845",
      volume: "$236,620,186",
      chartData: "up", // "up" or "down" to determine chart color
    },
    {
      id: 4,
      rank: 9,
      favorited: true,
      name: "Bitstamp",
      symbol: "BIT",
      logo: "https://cryptologos.cc/logos/bitshares-bts-logo.png",
      price: "$0.1802",
      change24h: "0.8%",
      change24hUp: true,
      change7d: "1.90%",
      change7dUp: false,
      marketCap: "$1,050,630,844",
      volume: "$236,620,186",
      chartData: "down", // "up" or "down" to determine chart color
    },
    {
      id: 5,
      rank: 11,
      favorited: true,
      name: "Gemini",
      symbol: "GUSD",
      logo: "https://cryptologos.cc/logos/gemini-dollar-gusd-logo.png",
      price: "$0.909802",
      change24h: "2.60%",
      change24hUp: true,
      change7d: "3.80%",
      change7dUp: true,
      marketCap: "$4,150,560,455",
      volume: "$236,620,186",
      chartData: "up", // "up" or "down" to determine chart color
    },
    {
      id: 6,
      rank: 12,
      favorited: true,
      name: "Medibloc",
      symbol: "MED",
      logo: "https://cryptologos.cc/logos/medibloc-med-logo.png",
      price: "$2.44502",
      change24h: "0.08%",
      change24hUp: false,
      change7d: "10.40%",
      change7dUp: true,
      marketCap: "$810,610,480",
      volume: "$236,620,186",
      chartData: "up", // "up" or "down" to determine chart color
    },
    {
      id: 7,
      rank: 3,
      favorited: true,
      name: "Kucoin",
      symbol: "KU",
      logo: "https://cryptologos.cc/logos/kucoin-token-kcs-logo.png",
      price: "$0.0090102",
      change24h: "1.30%",
      change24hUp: true,
      change7d: "6.90%",
      change7dUp: false,
      marketCap: "$5,30,845",
      volume: "$60,620,186",
      chartData: "down", // "up" or "down" to determine chart color
    },
    {
      id: 8,
      rank: 4,
      favorited: true,
      name: "Hexcoin",
      symbol: "HEX",
      logo: "https://cryptologos.cc/logos/hex-hex-logo.png",
      price: "$0.8802000",
      change24h: "0.6%",
      change24hUp: true,
      change7d: "3.60%",
      change7dUp: true,
      marketCap: "$1,50,630,785",
      volume: "$36,620,345",
      chartData: "up", // "up" or "down" to determine chart color
    }
  ]);

  const toggleFavorite = (id) => {
    setStocks(stocks.map(stock => 
      stock.id === id ? {...stock, favorited: !stock.favorited} : stock
    ));
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
                  <TableHead className="text-gray-400 text-right">7D</TableHead>
                  <TableHead className="text-gray-400 text-right">
                    <div className="flex items-center justify-end">
                      Market cap
                      <CircleDollarSign className="h-4 w-4 ml-1 opacity-50" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-400 text-right">
                    <div className="flex items-center justify-end">
                      Volume
                      <BarChart className="h-4 w-4 ml-1 opacity-50" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-400 text-right">Last 7 days</TableHead>
                  <TableHead className="text-gray-400 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks.map((stock) => (
                  <TableRow 
                    key={stock.id} 
                    className="border-gray-800 hover:bg-gray-900/50 cursor-pointer"
                    onClick={() => handleStockClick(stock.symbol)}
                  >
                    <TableCell className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click when favoriting
                          toggleFavorite(stock.id);
                        }}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`h-5 w-5 ${stock.favorited ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} 
                        />
                      </button>
                      <span className="text-gray-400">{stock.rank}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-white/10 p-1 flex items-center justify-center">
                          <img 
                            src={stock.logo} 
                            alt={stock.name} 
                            className="h-6 w-6 rounded-full" 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://placehold.co/36x36/gray/white?text=' + stock.symbol.charAt(0);
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-white">{stock.name}</div>
                          <div className="text-xs text-gray-400">{stock.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-white">
                      {stock.price}
                    </TableCell>
                    <TableCell className={`text-right ${stock.change24hUp ? 'text-green-500' : 'text-red-500'}`}>
                      <div className="flex items-center justify-end">
                        {stock.change24hUp ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        {stock.change24h}
                      </div>
                    </TableCell>
                    <TableCell className={`text-right ${stock.change7dUp ? 'text-green-500' : 'text-red-500'}`}>
                      <div className="flex items-center justify-end">
                        {stock.change7dUp ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        {stock.change7d}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-white">
                      {stock.marketCap}
                    </TableCell>
                    <TableCell className="text-right text-white">
                      {stock.volume}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-10 w-32 flex items-center justify-center">
                        {stock.chartData === "up" ? (
                          <svg width="100" height="30" viewBox="0 0 100 30" className="inline-block">
                            <path
                              d="M0 20 L10 15 L20 25 L30 18 L40 22 L50 10 L60 5 L70 15 L80 12 L90 7 L100 3"
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="2"
                            />
                          </svg>
                        ) : (
                          <svg width="100" height="30" viewBox="0 0 100 30" className="inline-block">
                            <path
                              d="M0 10 L10 15 L20 5 L30 12 L40 8 L50 20 L60 25 L70 15 L80 18 L90 23 L100 27"
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-1">
                        <button 
                          className="p-1.5 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click when clicking more options
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
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