import { Chart as ChartJS, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(...registerables);

interface PieChartProps {
  pieChartData: number[];
  colorsData: string[];
  showCurrencySymbol?: boolean;
}

export const PieChart = ({
  pieChartData = [],
  colorsData = [],
  showCurrencySymbol = true,
}: PieChartProps) => {
  const data = {
    labels: [],
    datasets: [
      {
        data: pieChartData,
        backgroundColor: colorsData,
        borderColor: colorsData,
        borderWidth: 0,
        hoverBackgroundColor: colorsData,
      },
    ],
  };

  const options: any = {
    plugins: {
      borderWidth: 0,
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context: { parsed: any }) {
            return context.parsed;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="h-[120px] w-[120px] mt-[10px]">
      <Pie data={data} options={options} />
    </div>
  );
};
