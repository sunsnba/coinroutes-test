export const aggregateLevels = (levels, increment, side) => {
  const groupedLevels = {};

  levels.forEach((level) => {
    const bucketPrice =
      side === 'bids'
        ? Math.floor(level.price / increment) * increment
        : Math.ceil(level.price / increment) * increment;

    if (!groupedLevels[bucketPrice]) {
      groupedLevels[bucketPrice] = {
        price: Number(bucketPrice.toFixed(2)),
        size: 0,
      };
    }

    groupedLevels[bucketPrice].size += level.size;
  });

  const aggregatedLevels = Object.values(groupedLevels);

  aggregatedLevels.sort((a, b) => {
    return side === 'bids' ? b.price - a.price : a.price - b.price;
  });

  return aggregatedLevels;
};