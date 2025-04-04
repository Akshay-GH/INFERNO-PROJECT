import { useEffect, useRef } from "react";

const useWebSocket = (roomName) => {
    const socketRef = useRef(null);

    useEffect(() => {
        if (!roomName) return;

        const wsUrl = new URL(`ws://127.0.0.1:8000/ws/stock/${roomName}/?stock_picker=AAPL&stock_picker=GOOGL&stock_picker=AMZN&stock_picker=MSFT&stock_picker=TSLA&stock_picker=NVDA&stock_picker=META&stock_picker=NFLX`);
        

        console.log("Connecting to WebSocket:", wsUrl.toString());

        const stockSocket = new WebSocket(wsUrl); //
        socketRef.current = stockSocket;
        

        // Add cookie to WebSocket connection
        stockSocket.onopen = function(event) {
            console.log("WebSocket connection opened:", event);
            // This ensures cookies are sent with the WebSocket connection
            document.cookie = `sessionid=${getCookie('sessionid')}; path=/`;
        };

        stockSocket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log("good",Object.entries(data))
            console.log("Received Data:", data);

            for (const [ticker, values] of Object.entries(data)) {
                const elements = {
                    price: document.getElementById(`${ticker}_price`),
                    open: document.getElementById(`${ticker}_open`),
                    high: document.getElementById(`${ticker}_high`),
                    low: document.getElementById(`${ticker}_low`),
                    vol: document.getElementById(`${ticker}_vol`)
                };

                for (const [key, element] of Object.entries(elements)) {
                    if (element && values[key] !== undefined) {
                        if (key === 'price' && element.dataset.prevValue) {
                            const prevValue = parseFloat(element.dataset.prevValue);
                            const currentValue = parseFloat(values[key]);
                            element.classList.remove('text-red-500', 'text-green-500');
                            if (currentValue > prevValue) {
                                element.classList.add('text-green-500');
                            } else if (currentValue < prevValue) {
                                element.classList.add('text-red-500');
                            }
                        }
                        element.textContent = values[key];
                        if (key === 'price') {
                            element.dataset.prevValue = values[key];
                        }
                    }
                }
            }
        };

        stockSocket.onerror = function(error) {
            console.error("WebSocket Error:", error);
        };

        return () => {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
        };
    }, [roomName]);

    return socketRef;
};

// Helper function to get cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default useWebSocket;