import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export const TransactionsChart = () => {
  const data = {
    labels: ['Hobby', 'Products', 'Cinema', 'Health'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ['#66c2a5', '#41ae76', '#238b45', '#006d2c'],
        borderRadius: 12, // Round the edges of the segments
        spacing: -90,
      },
    ],
  };

  const options = {
    rotation: -83, // Start angle for the chart
    circumference: 175, // Sweep angle for the chart
    cutout: '75%', // Cut out the middle of the chart
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
    },
  };

  return (
    <div className="relative flex flex-row items-center bg-[#171719] rounded-[30px] px-[40px] gap-[40px] max-w-[630px]">
      <div className="flex flex-col">
        <Doughnut data={data} options={options} />
        <div className="text-white text-2xl font-bold mt-4">100%</div>
      </div>

      <div className="mt-4 flex flex-col items-start">
        <div className="flex items-center mb-2">
          <span
            className="w-3 h-3 rounded-full inline-block mr-2"
            style={{ backgroundColor: '#66c2a5' }}
          ></span>
          <span className="text-white">Hobby: 45%</span>
        </div>
        <div className="flex items-center mb-2">
          <span
            className="w-3 h-3 rounded-full inline-block mr-2"
            style={{ backgroundColor: '#41ae76' }}
          ></span>
          <span className="text-white">Products: 25%</span>
        </div>
        <div className="flex items-center mb-2">
          <span
            className="w-3 h-3 rounded-full inline-block mr-2"
            style={{ backgroundColor: '#238b45' }}
          ></span>
          <span className="text-white">Cinema: 20%</span>
        </div>
        <div className="flex items-center">
          <span
            className="w-3 h-3 rounded-full inline-block mr-2"
            style={{ backgroundColor: '#006d2c' }}
          ></span>
          <span className="text-white">Health: 10%</span>
        </div>
      </div>
    </div>
  );
};
