import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import classNames from "classnames";
import Image from "next/image";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

type FullDoughnutProps = {
  halfDoughnut?: boolean;
  total?: string | number;
  doughnutData?: string[] | number[];
  colorsData?: string[];
  className?: string;
  showCurrencySymbol?: boolean;
};

export const FullDoughnut = ({
  halfDoughnut = false,
  total = "",
  doughnutData = [],
  colorsData = [],
  className,
}: FullDoughnutProps) => {
  const plugins: any = [
    {
      beforeDraw: (chart: { width: any; height: any; ctx: any }) => {
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;
        ctx.restore();
        ctx.font = 2 + "em sans-serif";
        const text = total;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 1.9;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  const options: any = {
    responsive: true,
    borderWidth: 0,
    rotation: halfDoughnut ? -90 : 0,
    circumference: halfDoughnut ? 180 : 360,
    maintainAspectRatio: false,
    cutout: halfDoughnut ? 95 : 45,
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context: { parsed: any }) {
            return context.parsed;
          },
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        data: doughnutData,
        backgroundColor: colorsData,
        hoverBackgroundColor: colorsData,
      },
    ],
  };

  return (
    <div
      className={classNames(
        "w-[150px] h-[150px] flex justify-center",
        className
      )}
    >
      {Number(total) > 0 ? (
        <Doughnut
          data={data}
          options={options}
          plugins={halfDoughnut ? [] : plugins}
        />
      ) : (
        <Image
          src={require("public/assets/NoData.svg")}
          alt={"No Data"}
          width={120}
          height={120}
        ></Image>
      )}
    </div>
  );
};
