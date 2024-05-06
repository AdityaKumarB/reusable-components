import { FormFieldsProps } from "@/utils/form-config";
import { Form, FormItemProps, Radio, RadioProps } from "antd";
import classNames from "classnames";
import { FormLabel } from "./form-label";

export interface RadioButtonFieldProps extends FormFieldsProps {
  fieldProps?: RadioProps;
  formItemProps?: FormItemProps;
  direction?: string;
}

export const RadioButtonField = ({
  label,
  errorMessage = "Required",
  identifier,
  fieldProps,
  formItemProps,
  required = true,
  direction = "vertical",
}: RadioButtonFieldProps) => {
  const name = identifier ?? label;

  return (
    <div
      className={classNames(
        direction === "horizontal"
          ? "flex items-center mb-[24px] -mt-[10px]"
          : "flex flex-col",
        "w-[100%]"
      )}
    >
      <div className={`${direction === "horizontal" ? "w-[164px]" : ""} `}>
        <FormLabel {...{ label, required, direction }} />
      </div>
      <Form.Item
        name={identifier ?? label}
        rules={[{ required, message: errorMessage }]}
        colon={false}
        {...formItemProps}
        className="w-[100%]"
        data-testid="radioButtonFormItem"
      >
        <Radio.Group
          {...fieldProps}
          data-testid={`radioGroup${name ?? ""}`}
        ></Radio.Group>
      </Form.Item>
    </div>
  );
};
