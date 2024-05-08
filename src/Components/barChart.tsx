import { Space } from "antd";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { barChartUtils } from "../utils/constants";
ChartJS.register(...registerables);

interface BarChartProps {
  dataSet1?: number[];
  dataSet2?: number[];
}

export const BarChart = ({ dataSet1 = [], dataSet2 = [] }: BarChartProps) => {
  const options: any = {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            if (
              dataSet1?.[context?.["dataIndex"]] ===
                dataSet2?.[context["dataIndex"]] &&
              context["datasetIndex"] === 0
            ) {
              return "";
            } else {
              return context.parsed.y;
            }
          },
          title: function () {
            return "";
          },
        },
      },
    },
    responsive: true,
    barThickness: 15,
    scales: {
      x: {
        stacked: true,
        grid: {
          color: "white",
        },
      },
      y: {
        axis: {
          color: "rgba(29, 78, 216, 1)",
        },
        border: {
          display: false,
        },
      },
    },
  };

  const labels: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataSet2,
        backgroundColor: "rgba(29, 78, 216, 1)",
        borderRadius: 4,
        hoverBackgroundColor: "rgba(29, 78, 216, 1)",
      },
      {
        label: "Dataset 2",
        data: dataSet1,
        borderRadius: 4,
        backgroundColor: "rgba(191, 219, 254, 1)",
        hoverBackgroundColor: "rgba(191, 219, 254, 1)",
      },
    ],
  };
  return (
    <div className="flex flex-1 flex-col">
      <Bar options={options} data={data} />
      <Space className="mt-[11px]">
        {barChartUtils?.types?.map((item: any) => (
          <div className="flex items-center mr-[16px]" key={item?.label}>
            <div
              className="h-[12px] w-[12px] rounded-full mr-[6px]"
              style={{ backgroundColor: item?.color }}
            ></div>
            <div
              className="text-[10px] font-primary text-muted800"
              data-testid={`tooltip-label${item.label ?? ""}`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </Space>
    </div>
  );
};
