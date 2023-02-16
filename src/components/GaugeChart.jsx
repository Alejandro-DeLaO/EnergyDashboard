import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const defaultData = {
  datasets: [
    {
      data: [20, 20, 20, 20, 20],
      backgroundColor: ["#009a60", "#92b73a", "#edbd02", "#fc6114", "#ed0022"],
      needleValue: 50,
      borderColor: ["white"],
      borderWidth: 2,
      cutout: "65%",
      circumference: 180,
      rotation: 270,
      borderRadius: 5,
    },
  ],
};


// gaugeNeedle block
const gaugeNeedle = {
  id: "gaugeNeedle",
  afterDatasetDraw(chart, args, options) {
    const {
      ctx,
      config,
      data,
      chartArea: { top, bottom, left, right, width, height },
    } = chart;

    ctx.save();
    const needleValue = data.datasets[0].needleValue;
    const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

    const angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
    const cx = width / 2;
    const cy = chart._metasets[0].data[0].y;
    console.log(ctx);

    // needle
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(chart._metasets[0].data[0].outerRadius + 10, 0);
    ctx.lineTo(0, 10);
    ctx.fillStyle = "#444";
    ctx.fill();
    ctx.restore();

    // needle dot
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, 10);
    ctx.fillStyle = "#444";
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "#444";
    ctx.font = "13px Helvetica";
    ctx.fillText("+100KWh", width - 30, cy + 15);
    ctx.textAlign = "center";
    ctx.restore();

    ctx.fillStyle = "#444";
    ctx.font = "13px Helvetica";
    ctx.fillText("0KWh", 0 + 30, cy + 15);
    ctx.textAlign = "center";
    ctx.restore();
  },
};

// return block
function DoughnutChart({ chartData = defaultData }) {
  return (
    <div className="chart-container" style={{height: "100%"}}>
      <Doughnut
        data={chartData}
        plugins={[gaugeNeedle]}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  );
}
export default DoughnutChart;