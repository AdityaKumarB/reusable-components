import { FormFieldsProps } from "@/utils/form-config";
import { preventSpaces } from "@/utils/mudles";
import { Form, FormInstance, FormItemProps, Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { FormLabel } from "./form-label";

export interface TextInputFieldProps extends FormFieldsProps {
  password?: boolean;
  fieldProps?: TextAreaProps;
  formItemProps?: FormItemProps;
  direction?: any;
  form?: FormInstance<any>;
}

export const TextAreaField = ({
  label,
  errorMessage = "Required",
  identifier,
  fieldProps,
  formItemProps,
  required = true,
  direction = "vertical",
  form,
}: TextInputFieldProps) => {
  const { TextArea } = Input;
  const [rows, setRows] = useState(2);
  const [value, setValue] = useState("");

  useEffect(() => {
    const rowlen = value.split("\n");

    if (rowlen.length > 2 && rowlen.length < 500) {
      setRows(rowlen.length);
    }
  }, [value]);

  return (
    <div
      className={classNames(
        direction === "horizontal"
          ? "flex items-center mb-[24px]"
          : "flex flex-col",
        "w-[100%]"
      )}
    >
      <div
        className={`${
          direction === "horizontal" ? "w-[188px] -mt-[25px]" : ""
        } `}
      >
        <FormLabel {...{ label, required, direction }} />
      </div>
      <Form.Item
        name={identifier ?? label}
        rules={[{ required, message: errorMessage }]}
        colon={false}
        className="w-[100%]"
        data-testid="textAreaFormItem"
        {...formItemProps}
      >
        <TextArea
          rows={rows}
          className="w-[100%] p-[12px] rounded-[6px] text-[14px] border-[1px] font-[400] font-primary min-h-20 resize-none"
          data-testid={`textArea${identifier ?? label ?? ""}`}
          onKeyDown={fieldProps?.onKeyDown ?? preventSpaces}
          onChange={(text) => {
            text.target.value?.trim()?.length === 0 &&
              form?.setFieldValue(identifier ?? label, undefined);
            setValue(text.target.value);
          }}
          autoSize={true}
          {...fieldProps}
        />
      </Form.Item>
    </div>
  );
};
