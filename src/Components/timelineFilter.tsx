import { DatePicker, Radio } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface TimelIneFilterProps {
  withOnlyPicker: boolean;
  initialOption?: TimelineOptions;
  initialRange?: DateRange;
  onChangeTimeline?: (option?: TimelineOptions, range?: DateRange) => void;
}

export enum TimelineOptions {
  "Last Month" = "30",
  "Last 3 Months" = "90",
  "Last 6 Months" = "180",
  "Last 1 year" = "365",
  "Custom Date" = "Custom Date",
}
export type DateRange = {
  startDate: Dayjs;
  endDate: Dayjs;
};

const TimelIneFilter = ({
  withOnlyPicker,
  initialOption,
  initialRange,
  onChangeTimeline,
}: TimelIneFilterProps) => {
  const handleRadioChange = (selected: TimelineOptions) => {
    if (selected === TimelineOptions["Custom Date"]) {
      onChangeTimeline?.(selected);
    } else {
      const currentDate = dayjs();
      const days = parseInt(
        TimelineOptions[selected as keyof typeof TimelineOptions]
      );
      onChangeTimeline?.(selected, {
        startDate: currentDate.subtract(days, "day"),
        endDate: currentDate,
      });
    }
  };
  const options = [
    "Last Month",
    "Last 3 Months",
    "Last 6 Months",
    "Last 1 year",
    "Custom Date",
  ];
  return (
    <Radio.Group
      className="flex flex-col gap-3"
      onChange={(e) => handleRadioChange(e.target.value)}
      value={initialOption}
    >
      {!withOnlyPicker && (
        <>
          {options.map((option) => (
            <Radio value={option} key={option} className="accent-themeBg">
              {option}
            </Radio>
          ))}
        </>
      )}
      {(withOnlyPicker || initialOption === TimelineOptions["Custom Date"]) && (
        <DatePicker.RangePicker
          value={
            initialRange == undefined
              ? [null, null]
              : [initialRange?.startDate, initialRange?.endDate]
          }
          className="h-10 timeLineRange"
          allowClear
          format="DD-MM-YYYY"
          onChange={(dates) => {
            const startDate = dates?.[0];
            const endDate = dates?.[1];
            if (startDate && endDate) {
              onChangeTimeline?.(initialOption, { startDate, endDate });
            } else {
              onChangeTimeline?.(initialOption);
            }
          }}
        />
      )}
    </Radio.Group>
  );
};

export default TimelIneFilter;
