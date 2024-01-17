import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  },
  animation: {
    duration: 1000 // 이 값은 애니메이션 속도를 조절합니다.
  }
};

const initialData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
	  {
		label: 'Dataset 1',
		data: [65, 59, 80, 81, 56, 55, 40],
		backgroundColor: 'rgba(255, 99, 132, 0.5)',
	  },
	  {
		label: 'Dataset 2',
		data: [28, 48, 40, 19, 86, 27, 90],
		backgroundColor: 'rgba(54, 162, 235, 0.5)',
	  },
	],
  };

const D = () => {
  const [data, setData] = useState(initialData);

  const updatePartOfChartData = () => {
    let newData = { ...data };

    newData.datasets[0].data[0] = Math.floor(Math.random() * 100);

    setData(newData);
  };

  return (
    <div>
      <Bar data={data} options={options} />
      <button onClick={updatePartOfChartData}>Update Part of Chart</button>
    </div>
  );
}

export default D;
