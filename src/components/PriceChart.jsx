import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const PriceChart = ({ midPrice, selectedPair }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
  }, [selectedPair]);

  useEffect(() => {
    if (midPrice === null) return;

    setData((prevData) => {
      const nextData = [
        ...prevData,
        {
          time: new Date().toLocaleTimeString(),
          price: midPrice,
        },
      ];

      return nextData.slice(-20);
    });
  }, [midPrice]);

  return (
    <div>
      <h2 className="panel-title">Price Chart</h2>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 12, left: 28, bottom: 20 }}
          >
            <CartesianGrid stroke="#1f2937" vertical={false} />
            <XAxis
              dataKey="time"
              minTickGap={40}
              tickMargin={10}
              interval="preserveStartEnd"
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              width={90}
              domain={['auto', 'auto']}
              tickFormatter={(value) => Number(value).toFixed(2)}
            />
            <Tooltip
              formatter={(value) => Number(value).toFixed(2)}
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1f2937',
                borderRadius: '8px',
                color: '#e5e7eb',
              }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;