import { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  Info,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StarBackground from '../components/StarBackground';
import { Button } from "../components/ui/button";
import ErrorBoundary from '../components/ErrorBoundary';
import CandleStickChart from "../components/CandleStickChart";
import BG from '../assets/BgInferno.svg';


const StockChart = () => {
  
  // const { symbol } = useParams();
  const navigate = useNavigate();

  const {ticker}=useParams();
  useEffect(() => {
    if (!ticker) {
      navigate("/stocklist/"); // Redirect back to home if no ticker is found
    }
  }, [ticker, navigate]);

  // const [stockSymbol, setStockSymbol] = useState(symbol || "");
  const [quantity, setQuantity] = useState("");
  const [orderType, setOrderType] = useState("market");
  const [price, setPrice] = useState("");
  const [userBalance, setUserBalance] = useState(0);

  // useEffect(() => {
  //   const fetchCSRFToken = async () => {
  //     try {
  //       const response = await fetch('http://20.193.151.222:8000/get_csrf/', {
  //         credentials: 'include',  // Important for cookies
  //       });
  //       if (!response.ok) throw new Error('Failed to get CSRF token');
  //     } catch (error) {
  //       console.error('CSRF token fetch error:', error);
  //     }
  //   };
  //   fetchCSRFToken();
  // }, []);

  const handleTrade = async (action) => {
    // if (!stockSymbol || !quantity) {
    //   alert("Please select a stock and enter quantity");
    //   return;
    // }
  
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid quantity");
      return;
    }
  
    if (orderType === "limit" && (!price || isNaN(parseFloat(price)))) {
      alert("Please enter a valid price for limit order");
      return;
    }
  
    try {
      // Fetch CSRF token
      // const csrfResponse = await fetch("http://localhost:8000/get_csrf/", {
      //   method: "GET",
      //   credentials: "include",
      // });
      
      // if (!csrfResponse.ok) throw new Error("CSRF token fetch failed");
      
      // Get token from header or cookie
      // const csrfData = await csrfResponse.json();
      // const csrfToken = csrfData.csrfToken;

      // Should be (based on your backend):
      // const csrfToken = csrfResponse.headers.get('X-CSRFToken') || 
      
      //             document.cookie.match(/csrftoken=([^;]+)/)?.[1];
      
      // if (!csrfToken) throw new Error("CSRF token missing");
  
      // Prepare form data
      const formData = new URLSearchParams();
      formData.append("stock_symbol", ticker);
      formData.append("quantity", qty);
      formData.append("order_type", orderType);
      if (orderType === "limit") formData.append("price", price);
      formData.append("action", action);
      
  
      // Send trade request
      const response = await fetch("http://127.0.0.1:8000/place_order/", {
        method: "POST",
        credentials: 'include',
        
        headers: {
            "Content-Type": "application/x-www-form-urlencoded", // here Content-Type  is used 
            // "X-CSRFToken": csrfToken,  // You'll need to get this from your cookies or meta tag
        },
        body: formData,
        
    });
      console.log(response)
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Trade failed");
  
      // Update UI
      setUserBalance(Number(data.balance).toFixed(2));
      alert(`${action} successful: ${qty} ${ticker} at $${data.price?.toFixed(2) || 'market price'}`);
      
    } catch (error) {
      console.error("Trade error:", error);
      alert(`Error: ${error.message}`);
    }
  };
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background"
      style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      
      <StarBackground />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 text-white">
        <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-700 mb-6">
          <div className='text-white '>{ticker}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass-panel p-6 rounded-xl backdrop-blur-xl border border-gray-700 h-[600px]">
              <ErrorBoundary>
                <CandleStickChart 
                stockSymbol={ticker}
                  height="100%"
                  upColor="#4CAF50"
                  downColor="#FF5252"
                  showTooltip={true}
                />
              </ErrorBoundary>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
              {/* <select
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
                className="block w-full p-2 border rounded mb-2"
              >
                <option value="">Select Stock</option>
                <option value="MSFT">MSFT</option>
                <option value="AAPL">AAPL</option>
                <option value="GOOGL">GOOGL</option>
                <option value="AMZN">AMZN</option>
                <option value="TSLA">TSLA</option>
                <option value="NVDA">"NVDA</option>
                <option value="NFLX">NFLX</option>
                <option value="META">META</option>


              </select> */}

              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
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
                  min="0.01"
                  step="0.01"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart