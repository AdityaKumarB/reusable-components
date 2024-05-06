import { defaultFormDateFormat } from "@/utils/constants";
import { FormFieldsProps } from "@/utils/form-config";
import { DatePicker, Form, FormItemProps } from "antd";
import { DatePickerProps } from "antd/es/date-picker";
import { FormInstance } from "antd/lib";
import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import { FormLabel } from "./form-label";

export interface DatePickerFieldProps extends FormFieldsProps {
  format?: DatePickerProps["format"];
  formItemProps?: FormItemProps;
  fieldProps?: DatePickerProps;
  direction?: string;
  form?: FormInstance<any>;
}

export const DatePickerField = ({
  label,
  errorMessage = "Required",
  format = defaultFormDateFormat,
  formItemProps,
  identifier,
  fieldProps,
  required = true,
  direction = "vertical",
  form,
}: DatePickerFieldProps) => {
  const name = identifier ?? label;

  return (
    <div className="w-[100%]">
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
          rules={[{ required, message: errorMessage }]}
          colon={false}
          {...formItemProps}
          className={classNames(
            direction === "horizontal" ? "w-[50%]" : "w-[100%]"
          )}
          data-testid="datePickerFormItem"
          initialValue={
            formItemProps?.initialValue
              ? dayjs(formItemProps?.initialValue)
              : undefined
          }
        >
          <DatePicker
            className="w-[100%] h-[40px]"
            format={format}
            suffixIcon={
              <Image
                src={require("public/assets/calendar.svg")}
                height={20}
                width={20}
                alt=""
              />
            }
            {...fieldProps}
            data-testid={`datePicker ${name}`}
            onChange={(value) => {}}
          />
        </Form.Item>
      </div>
    </div>
  );
};
