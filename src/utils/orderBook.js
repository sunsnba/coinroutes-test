export const buildOrderBook = (snapshot) => {
  return {
    bids: snapshot.bids.map(([price, size]) => ({
      price: Number(price),
      size: Number(size),
    })),
    asks: snapshot.asks.map(([price, size]) => ({
      price: Number(price),
      size: Number(size),
    })),
  };
};

export const updateOrderBook = (orderBook, changes) => {
  const nextBids = [...orderBook.bids];
  const nextAsks = [...orderBook.asks];

  changes.forEach(([side, price, size]) => {
    const numericPrice = Number(price);
    const numericSize = Number(size);
    const bookSide = side === 'buy' ? nextBids : nextAsks;

    const existingIndex = bookSide.findIndex((level) => level.price === numericPrice);

    if (numericSize === 0) {
      if (existingIndex !== -1) {
        bookSide.splice(existingIndex, 1);
      }
      return;
    }

    if (existingIndex !== -1) {
      bookSide[existingIndex] = {
        price: numericPrice,
        size: numericSize,
      };
    } else {
      bookSide.push({
        price: numericPrice,
        size: numericSize,
      });
    }
  });

  nextBids.sort((a, b) => b.price - a.price);
  nextAsks.sort((a, b) => a.price - b.price);

  return {
    bids: nextBids,
    asks: nextAsks,
  };
};