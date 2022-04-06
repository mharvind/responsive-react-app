import React, { useMemo } from "react";
import { Pie, defaults, Bar } from "react-chartjs-2";

//defaults.global.tooltips.enabled = false;
//defaults.global.legend.position = "bottom";

const BarChart = (props) => {
  return (
    <div>
      <Bar
        data={{
          labels: props.data ? props.data.labels : [],
          datasets: props.data ? props.data.data : [],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
