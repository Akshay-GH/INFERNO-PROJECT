import { useState,useEffect, } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  Minus, 
  Info,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StarBackground from '../components/StarBackground';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";
import BG from '../assets/BgInferno.svg';
import CandleStickChart from "../components/CandleStickChart";
import ErrorBoundary from '../components/ErrorBoundary';

const StockChart = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [timeInForce, setTimeInForce] = useState('day');
  const [stockSymbol, setStockSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderType, setOrderType] = useState("market");
  const [price, setPrice] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  



  // Mock stock data
  const stockData = {
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    currentPrice: 26735.59,
    change24h: -5.12,
    change24hUp: false,
    marketCap: "23,621,421,545",
    volume: "2,487,902,497",
    high24h: 27890.45,
    low24h: 26100.30,
    allTimeHigh: 69000,
    supply: "19,428,550",
    maxSupply: "21,000,000",
  };

  // Quantity handlers
  // const handleQuantityChange = (e) => {
  //   const value = parseInt(e.target.value);
  //   if (!isNaN(value) && value > 0) setQuantity(value);
  //   else if (e.target.value === '') setQuantity('');
  // };

  // const incrementQuantity = () => setQuantity(prev => prev + 1);
  // const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  // // Trade handlers
  // const handleBuy = () => toast.success(`Bought ${quantity} ${stockData.symbol} at $${stockData.currentPrice}`);
  // const handleSell = () => toast.success(`Sold ${quantity} ${stockData.symbol} at $${stockData.currentPrice}`);

///// buy/sell logic 



const fetchLivePrices = async () => {
  try {
    const response = await fetch("http://20.193.151.222:8000/get_live_prices/");
    const data = await response.json();
    
    // Update state with new prices
    setStockPrices(data.prices);
    
    // Optionally update portfolio value
    if (data.portfolioValue) {
      setPortfolioValue(data.portfolioValue);
    }
    
  } catch (error) {
    console.error("Error fetching live prices:", error);
  }
};
  const handleTrade = async (action) => {
    console.log(stockSymbol)
    if (!stockSymbol || !quantity) {
      alert("Please select a stock and enter a quantity.");
      return;
    }

    if (orderType === "limit" && !price) {
      alert("Please enter a price for the limit order.");
      return;
    }
    

    const orderData = {
      stock_symbol: stockSymbol,
      quantity: parseInt(quantity),
      order_type: orderType,
      price: orderType === "limit" ? parseInt(price) : null,
      action,
    };
    console.log(orderData);
    try {
      const response = await fetch("http://20.193.151.222:8000/place_order/", {
        method: "POST",
        headers: {
         "Content-Type": "application/x-www-form-urlencoded",
        //  "Content-Type": "application/json",

    "X-CSRFToken": "{{ csrf_token }}", // Ensure CSRF token is handled properly
        },
        body: new URLSearchParams(orderData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error(`Server error: ${response.status}`);
      }
     
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert(
          data.message ||
            `Successfully ${action} ${data.quantity} shares of ${data.stock} at $${data.price.toFixed(2)}!`
        );
        setUserBalance(data.balance.toFixed(2));
        // fetchLivePrices();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while placing the order.");
    }
  };

  

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background"
      style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      
      <StarBackground />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 text-white">
        {/* Stock Header Section */}
        <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-white/10 p-1 flex items-center justify-center">
                <img 
                  src={stockData.logo} 
                  alt={stockData.name} 
                  className="h-10 w-10 rounded-full"
                  onError={(e) => e.target.src = `https://placehold.co/40x40/gray/white?text=${stockData.symbol.charAt(0)}`}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{stockData.name} ({stockData.symbol})</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-semibold text-white">
                    ${stockData.currentPrice.toLocaleString()}
                  </span>
                  <span className={`flex items-center ${stockData.change24hUp ? 'text-green-500' : 'text-red-500'}`}>
                    {stockData.change24hUp ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {Math.abs(stockData.change24h)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Button onClick={() => navigate('/trading')} variant="outline" className="border-gray-700">
                Back to Trading
              </Button>
              <Button variant="outline" className="border-gray-700">
                <Info className="h-4 w-4 mr-2" /> About
              </Button>
            </div>
          </div>
          
          {/* Stock Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              ['Market Cap', stockData.marketCap],
              ['24h Volume', stockData.volume],
              ['24h High', stockData.high24h.toLocaleString()],
              ['24h Low', stockData.low24h.toLocaleString()],
            ].map(([label, value]) => (
              <div key={label} className="bg-secondary/30 p-3 rounded-lg">
                <div className="text-gray-400 text-xs">{label}</div>
                <div className="text-white font-medium">${value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section - Left Column */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-700 h-[600px]">
              <ErrorBoundary>
                <CandleStickChart 
                  // data={sampleData}
                  height="100%"
                  upColor="#4CAF50"
                  downColor="#FF5252"
                  showTooltip={true}
                />
              </ErrorBoundary>
            </div>
          </div>

          {/* Buy/Sell Section - Right Column */}
          <div className="lg:col-span-1">
          <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
      <select
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value)}
        className="block w-full p-2 border rounded mb-2"
      >
        <option value="">Select Stock</option>
        <option value="MSFT">MSFT</option>
        {/* <option value="FB">Facebook</option>
        <option value="TWTR">Twitter</option> */}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="block w-full p-2 border rounded mb-2"
      />

      <select
        value={orderType}
        onChange={(e) => setOrderType(e.target.value)}
        className="block w-full p-2 border rounded mb-2"
      >
        <option value="market">Market Order</option>
        <option value="limit">Limit Order</option>
      </select>

      {orderType === "limit" && (
        <input
          type="number"
          placeholder="Limit Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="block w-full p-2 border rounded mb-2"
        />
      )}

      <button
        onClick={() => handleTrade("buy")}
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
      >
        Buy
      </button>
      <button
        onClick={() => handleTrade("sell")}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Sell
      </button>

      <div className="mt-4">User Balance: ${userBalance}</div>
    </div>
            {/* Asset Details */}
            {/* <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-800 mt-6">
              <h3 className="text-lg font-medium text-white mb-4">Asset Details</h3>
              <div className="space-y-3">
                {[
                  ['All Time High', `$${stockData.allTimeHigh.toLocaleString()}`],
                  ['Circulating Supply', `${stockData.supply} ${stockData.symbol}`],
                  ['Max Supply', `${stockData.maxSupply} ${stockData.symbol}`],
                  ['Supply Used', `${((parseFloat(stockData.supply.replace(/,/g, '')) / parseFloat(stockData.maxSupply.replace(/,/g, '')) * 100).toFixed(2))}%`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;

