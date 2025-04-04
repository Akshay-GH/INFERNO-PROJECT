import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function CandleStickChart({ stockSymbol }) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);
  const candleSeriesRef = useRef(null);
  const [hoverData, setHoverData] = useState(null);
  const [data, setData] = useState([]);

  // Initialize chart (runs only once)
  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartInstance.current = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#1a1a1a" },
        textColor: "#ffffff"
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      timeScale: { 
        timeVisible: true, 
        borderColor: "#333333",
        barSpacing: 8 // Better spacing for candlesticks
      },
      rightPriceScale: { borderColor: "#333333" },
      grid: {
        vertLines: { color: "#333333" },
        horzLines: { color: "#333333" },
      }
    });

    candleSeriesRef.current = chartInstance.current.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      borderVisible: false,
      priceLineVisible: false
    });

    // Crosshair subscription
    chartInstance.current.subscribeCrosshairMove(param => {
      if (!candleSeriesRef.current || !param.time) return;
      const priceData = param.seriesPrices.get(candleSeriesRef.current);
      if (!priceData) return;
      setHoverData({
        date: new Date(param.time * 1000).toLocaleDateString(),
        open: priceData.open,
        high: priceData.high,
        low: priceData.low,
        close: priceData.close
      });
    });

    // Resize observer
    const resizeObserver = new ResizeObserver(entries => {
      chartInstance.current.applyOptions({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height
      });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (chartInstance.current) {
        chartInstance.current.remove();
        chartInstance.current = null;
      }
    };
  }, []); // Empty dependency array means this runs only once

  // Fetch stock data from API
  // const fetchStockData = async () => {
  //   try {
  //     const response = await fetch("http://20.193.151.222:8000/stock_chart_data/MSFT/");
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const jsonData = await response.json();
  //     if (!jsonData.error) {
  //       // Update the candle series with new data
  //       if (candleSeriesRef.current) {
  //         candleSeriesRef.current.setData(
  //           jsonData.map(item => ({
  //             time: item.time,
  //             open: item.open,
  //             high: item.high,
  //             low: item.low,
  //             close: item.close
  //           }))
  //         );
  //       }
  //       setData(jsonData); // Still keep data in state if needed elsewhere
  //     }
  //   } catch (error) {
  //     console.error("Error fetching stock data:", error);
  //   }
  // };

  const fetchStockData = async () => {
    try {
      const response = await fetch("http://localhost:8000/stock_chart_data/MSFT/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      
      if (!jsonData.error) {
        // ✅ Ensure data is sorted in ascending order by time
        const sortedData = jsonData.sort((a, b) => a.time - b.time);
  
        // ✅ Update the candle series with sorted data
        if (candleSeriesRef.current) {
          candleSeriesRef.current.setData(
            sortedData.map(item => ({
              time: item.time,
              open: item.open,
              high: item.high,
              low: item.low,
              close: item.close
            }))
          );
        }
  
        setData(sortedData); // Still keep sorted data in state if needed
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };
  

  // Setup interval for data updates
  useEffect(() => {
    fetchStockData(); // Initial fetch
    const interval = setInterval(fetchStockData, 2000);
    return () => clearInterval(interval);
  }, [stockSymbol]); // Re-run when stockSymbol changes

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg">
      {hoverData && (
        <div className="bg-black/80 text-white p-3 rounded-lg mb-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Date:</span> <span>{hoverData.date}</span>
            <span>Open:</span> <span>₹{hoverData.open?.toLocaleString()}</span>
            <span>High:</span> <span>₹{hoverData.high?.toLocaleString()}</span>
            <span>Low:</span> <span>₹{hoverData.low?.toLocaleString()}</span>
            <span>Close:</span> <span>₹{hoverData.close?.toLocaleString()}</span>
          </div>
        </div>
      )}
      <div ref={chartContainerRef} className="w-full h-[500px]" />
    </div>
  );
}