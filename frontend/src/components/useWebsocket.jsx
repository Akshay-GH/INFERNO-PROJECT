import { useEffect, useRef } from "react";

const useWebSocket = (roomName) => {
    const socketRef = useRef(null);

    useEffect(() => {
        if (!roomName) return;

        // Get current query string
        const queryString = window.location.search.substring(1);
        console.log("Query String:", queryString);

        // IMPORTANT: Point to Django backend (port 8000) not Vite
        const wsUrl = 
            'ws://localhost:8000' +  // Hardcoded Django backend URL
            '/ws/stock/' +
            roomName +
            '/?' +
            queryString;

        console.log("Connecting to WebSocket:", wsUrl);

        // Initialize WebSocket connection
        const stockSocket = new WebSocket(wsUrl);
        socketRef.current = stockSocket;

        stockSocket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log("Received Data:", data);

            // Update DOM elements
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
                        element.innerText = values[key];
                    }
                }
            }
        };

        stockSocket.onopen = function(event) {
            console.log("WebSocket connection opened:", event);
        };

        stockSocket.onerror = function(error) {
            console.error("WebSocket Error:", error);
        };

        stockSocket.onclose = function(event) {
            console.log("WebSocket closed:", event);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [roomName]);

    return socketRef;
};

export default useWebSocket;