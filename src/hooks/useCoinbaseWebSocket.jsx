import { useEffect, useRef, useState } from 'react';
import { buildOrderBook, updateOrderBook } from '../utils/orderBook';

const useCoinbaseWebSocket = (selectedPair) => {
  const [displayOrderBook, setDisplayOrderBook] = useState(null);
  const liveOrderBookRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('wss://ws-feed.exchange.coinbase.com');

    liveOrderBookRef.current = null;
    setDisplayOrderBook(null);

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: 'subscribe',
          product_ids: [selectedPair],
          channels: ['level2_batch'],
        })
      );
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'snapshot') {
        liveOrderBookRef.current = buildOrderBook(message);
      }

      if (message.type === 'l2update') {
        if (!liveOrderBookRef.current) return;

        liveOrderBookRef.current = updateOrderBook(
          liveOrderBookRef.current,
          message.changes
        );
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    const intervalId = setInterval(() => {
      if (!liveOrderBookRef.current) return;

      setDisplayOrderBook({
        bids: [...liveOrderBookRef.current.bids],
        asks: [...liveOrderBookRef.current.asks],
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
      socket.close();
    };
  }, [selectedPair]);

  return displayOrderBook;
};

export default useCoinbaseWebSocket;