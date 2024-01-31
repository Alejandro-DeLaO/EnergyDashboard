import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


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
    
  
    


    
    // needle
    ctx.translate(cx + 30, cy);
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
    ctx.arc(cx + 30, cy, 10, 0, 10);
    ctx.fillStyle = "#444";
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "#444";
    ctx.font = "13px Helvetica";
    ctx.fillText("", cx*1.25, cy + 15);
    ctx.textAlign = "center";
    ctx.restore();

    ctx.fillStyle = "#444";
    ctx.font = "13px Helvetica";
    ctx.fillText("100%", cx*1.26, cy + 15);
    ctx.textAlign = "center";
    ctx.restore();

    ctx.fillStyle = "#444";
    ctx.font = "13px Helvetica";
    ctx.fillText("0%", cx/1.24, cy + 15);
    ctx.textAlign = "center";
    ctx.restore();
  },
};

// return block
function GaugeChart({ chartData }) {
  return (
    <div className="chart-container" style={{height: "100%"}} id="chart-container">
      <Doughnut
        data={chartData}
        plugins={[gaugeNeedle]}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          layout: {
            padding: 30
          }
        }}
        />
    </div>
  );
}
export default GaugeChart;