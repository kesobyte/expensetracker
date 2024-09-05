import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

// Function to generate random colors
const generateRandomColors = numColors => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    colors.push(randomColor);
  }
  return colors;
};

export const TransactionsChart = () => {
  const transactions = useSelector(state => state.transaction.transactions);
  const [categoryExpenses, setCategoryExpenses] = useState([]);

  useEffect(() => {
    if (transactions.length === 0) return; // Exit if no transactions

    // Calculate the total expenses for each category
    const expensesByCategory = {};

    transactions.forEach(transaction => {
      if (transaction.type === 'expenses') {
        const category = transaction.category?.categoryName;
        if (category) {
          expensesByCategory[category] =
            (expensesByCategory[category] || 0) + transaction.sum;
        }
      }
    });

    const totalExpenses = Object.values(expensesByCategory).reduce(
      (acc, sum) => acc + sum,
      0
    );

    const percentages = Object.entries(expensesByCategory).map(
      ([category, sum]) => ({
        category,
        percentage: Math.round((sum / totalExpenses) * 100),
        sum,
      })
    );

    // Adjust percentages to sum exactly to 100%
    const totalPercentage = percentages.reduce(
      (acc, item) => acc + item.percentage,
      0
    );

    if (totalPercentage !== 100 && percentages.length > 0) {
      const diff = 100 - totalPercentage;
      percentages[percentages.length - 1].percentage += diff;
    }

    setCategoryExpenses(percentages);
  }, [transactions]);

  // Generate dynamic random colors
  const backgroundColors = useMemo(
    () => generateRandomColors(categoryExpenses.length),
    [categoryExpenses.length]
  );

  // Prepare data for the chart
  const data = {
    labels: categoryExpenses.map(item => item.category),
    datasets: [
      {
        data: categoryExpenses.map(item => item.sum),
        backgroundColor: backgroundColors,
        borderWidth: 0,
        borderRadius: 5,
        spacing: -15,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    cutout: '67%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (categoryExpenses.length === 0) {
    return <p className="text-white">No data available for the chart.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center bg-[#171719] rounded-[30px] p-[20px] md:px-[40px] md:gap-[95px] xl:gap-[40px] xl:max-w-[630px] md:max-h-[302px] w-full">
      <div className="relative flex flex-col">
        <div>
          <p className="absolute top-[10px] md:top-[40px] text-[16px] text-[#fafafa80] font-normal">
            Expenses Category
          </p>
        </div>
        <div className="w-[100%] h-[250px] md:h-[320px]">
          <Doughnut data={data} options={options} />
        </div>
        <div className="absolute bottom-[15px] md:bottom-[40px] left-[120px] text-white text-[24px] font-bold">
          100%
        </div>
      </div>

      <div className="flex gap-[10px] flex-col px-[20px] md:max-w-[200px] w-[100%] max-h-[126px] pr-[25px] overflow-y-scroll">
        {categoryExpenses.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              ></div>
              <p className="text-[16px] text-[#fafafa80] font-normal">
                {item.category}
              </p>
            </div>
            <p className="text-[#fafafa] text-[16px] font-extrabold">
              {item.percentage ? `${item.percentage}%` : '0%'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
