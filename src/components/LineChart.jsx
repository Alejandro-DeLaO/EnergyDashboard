import { Line } from 'react-chartjs-2';

export default function LineChart({ chartData }) {
    return (
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    );
  }