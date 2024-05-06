import { END_TIME, START_TIME } from "@utils/constants";
import { Form, FormItemProps, TimePicker, TimePickerProps } from "antd";
import { FormInstance } from "antd/lib";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { FormFieldsProps } from "../utils/interfaces";
import { FormLabel } from "./form-label";

export interface TimePickerFieldProps extends FormFieldsProps {
  fieldProps?: TimePickerProps;
  formItemProps?: FormItemProps;
  direction?: string;
  form?: FormInstance<any>;
}

export const TimePickerField = ({
  label,
  errorMessage = "Required",
  formItemProps,
  identifier,
  fieldProps,
  required = true,
  direction = "vertical",
}: TimePickerFieldProps) => {
  const name = identifier ?? label;
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();

  const disabledTime = () => {
    const currentHour = dayjs().hour();
    const currentMinute = dayjs().minute();

    if (
      (identifier === START_TIME &&
        startDate &&
        dayjs(startDate)?.isSame(dayjs(), "day")) ||
      (identifier === END_TIME &&
        endDate &&
        dayjs(endDate)?.isSame(dayjs(), "day"))
    )
      return {
        disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
        disabledMinutes: (selectedHour: number) =>
          selectedHour === currentHour
            ? Array.from({ length: currentMinute }, (_, i) => i)
            : [],
        disabledSeconds: () => [],
      };
    else
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
  };

  const setInitialValueHandler = (date?: Dayjs) => {
    const isStart = identifier === START_TIME;
    if (isStart && date && dayjs(date)?.isSame(dayjs(), "day")) return dayjs();
    if (isStart) return dayjs().startOf("day");
    return dayjs().endOf("day");
  };

  return (
    <div
      className={classNames(
        direction === "horizontal" ? "flex items-baseline" : "flex flex-col",
        "w-[100%]"
      )}
    >
      <div
        className={classNames(direction === "horizontal" ? "w-[164px]" : "")}
      >
        <FormLabel {...{ label, required, direction }} />
      </div>
      <Form.Item
        name={name}
        rules={[
          { required, message: errorMessage },
          ({ getFieldValue }) => ({
            validator: (_, value) => {
              const startDate = getFieldValue("startDate");
              const endDate = getFieldValue("endDate");
              const startTime = getFieldValue("startTime");
              const time1 = dayjs(startTime);
              const time2 = dayjs(value);

              const differenceInMillis = Math.abs(time1.diff(time2));

              const differenceInMinutes = differenceInMillis / (1000 * 60);

              setStartDate(startDate);
              setEndDate(endDate);
              setInitialValueHandler(startDate);

              if (
                differenceInMinutes < 30 &&
                dayjs(endDate).isSame(startDate, "day") &&
                identifier === END_TIME
              ) {
                return Promise.reject(
                  new Error(
                    "The interval between start and end times must be 30 minutes."
                  )
                );
              }

              return Promise.resolve();
            },
          }),
        ]}
        className={classNames(
          direction === "horizontal" ? "w-[50%]" : "w-[100%]"
        )}
        {...formItemProps}
        data-testid="timePickerFormItem"
        initialValue={
          formItemProps?.initialValue
            ? dayjs(formItemProps?.initialValue)
            : setInitialValueHandler(startDate)
        }
      >
        <TimePicker
          className="w-[100%] h-[44px] text-[14px] font-[400] font-primary"
          suffixIcon={
            <Image
              src={require("public/assets/clock.svg")}
              height={20}
              width={20}
              alt=""
            />
          }
          format={"hh:mm A"}
          {...fieldProps}
          allowClear={false}
          disabledTime={disabledTime}
          data-testid={`timePickerFormItem${name ?? ""}`}
        />
      </Form.Item>
    </div>
  );
};
