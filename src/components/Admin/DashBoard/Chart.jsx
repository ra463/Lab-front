import React from 'react';
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const LineChart = ({ views = [] }) => {
  const labels = getLastYearMoths();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Yearly Views',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Views',
        data: views,
        borderColor: '#ffcc00',
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export const DoughnutChart = ({ users = [] }) => {
  const data = {
    labels: ['Subscribed', 'Unsubscribed'],
    datasets: [
      {
        label: 'Views',
        data: users,
        borderColor: ['#008cff', '#20c997'],
        backgroundColor: ['#008cff4a', '#20c99754'],
        borderWidth: 2,
      },
    ],
  };

  return <Doughnut data={data} />;
};

function getLastYearMoths() {
  const labels = [];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const currentMonth = new Date().getMonth();
  const remain = 11 - currentMonth;

  for (let i = currentMonth; i < months.length; i--) {
    const element = months[i];
    labels.unshift(element);
    if (i === 0) {
      break;
    }
  }

  for (let i = 11; i < remain; i--) {
    if (i === currentMonth) {
      break;
    }
    const element = months[i];
    labels.unshift(element);
  }

  return labels;
}
