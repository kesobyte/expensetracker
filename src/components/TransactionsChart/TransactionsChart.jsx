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
        backgroundColor: ['#0EF387', '#0EBB69', '#fafafa', '#fafafa80'],
        borderWidth: 0,
        borderRadius: 10,
        spacing: -60,
      },
    ],
  };

  const options = {
    rotation: -82, // Start angle for the chart
    circumference: 170, // Sweep angle for the chart
    cutout: '70%', // Cut out the middle of the chart
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
    },
  };

  return (
    <>
      <div className="flex items-center bg-[#171719] rounded-[30px] px-[40px] gap-[40px] max-w-[630px] max-h-[302px]">
        <div className="relative flex flex-col">
          <div>
            <p className="absolute top-[40px] text-[16px] text-[#fafafa80] font-normal">
              Expenses Category
            </p>
          </div>
          <Doughnut data={data} options={options} />
          <div className="absolute bottom-[40px] left-[120px] text-white text-[24px] font-bold">
            100%
          </div>
        </div>

        <div className="flex gap-[10px] flex-col max-w-[200px] w-[100%] max-h-[126px] pr-[25px] overflow-y-scroll">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: '#0EF387' }}
              ></div>
              <p className="text-[16px] text-[#fafafa80] font-normal">Hobby:</p>
            </div>
            <p className="text-[#fafafa] text-[16px] font-extrabold">45%</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: '#0EBB69' }}
              ></div>
              <p className="text-[16px] text-[#fafafa80] font-normal">
                Products
              </p>
            </div>
            <p className="text-[#fafafa] text-[16px] font-extrabold">25%</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: '#fafafa' }}
              ></div>
              <p className="text-[16px] text-[#fafafa80] font-normal">Cinema</p>
            </div>
            <p className="text-[#fafafa] text-[16px] font-extrabold">20%</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: '#fafafa80' }}
              ></div>
              <p className="text-[16px] text-[#fafafa80] font-normal">Health</p>
            </div>
            <p className="text-[#fafafa] text-[16px] font-extrabold">10%</p>
          </div>
        </div>
      </div>
    </>
  );
};
