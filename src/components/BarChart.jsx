import { Bar } from 'react-chartjs-2';

export default function BarChart({ chartData }) {
    return (
      <Bar
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