import { FormFieldsProps } from "@/utils/form-config";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, FormItemProps, Select, SelectProps, Tooltip } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { FormLabel } from "./form-label";

export interface DropdownFieldProps extends FormFieldsProps {
  type?: "multi_select" | "single_select";
  dropdownData: { label: string; value: string; title?: string }[];
  fieldProps?: SelectProps;
  formItemProps?: FormItemProps;
  direction?: any;
  showTooltip?: boolean;
  tooltipTitle?: string;
}

export const DropdownField = ({
  label,
  errorMessage = "Required",
  dropdownData,
  type,
  identifier,
  fieldProps,
  formItemProps,
  required = true,
  direction = "vertical",
  showTooltip = false,
  tooltipTitle,
}: DropdownFieldProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const name = identifier ?? label;

  return (
    <div
      className={classNames(
        direction === "horizontal" ? "flex items-baseline" : "flex flex-col",
        "w-[100%]"
      )}
    >
      <div
        className={classNames(
          direction === "horizontal" ? "w-[164px]" : "",
          "flex items-center"
        )}
      >
        <FormLabel {...{ label, required, direction }} />
        {showTooltip && (
          <Tooltip
            title={tooltipTitle}
            color="#191436"
            className="mb-1 ml-[10px]"
          >
            <InfoCircleOutlined className="w-3 h-3" />
          </Tooltip>
        )}
      </div>
      <Form.Item
        name={identifier ?? label}
        className={classNames(
          direction === "horizontal" ? "w-[50%]" : "w-[100%]"
        )}
        rules={[
          {
            required,
            message: errorMessage,
            type: type === "multi_select" ? "array" : "string",
          },
        ]}
        colon={false}
        {...formItemProps}
        data-testid="dropdownFormItem"
      >
        <Select
          title=" "
          mode={type === "multi_select" ? "multiple" : undefined}
          onDropdownVisibleChange={setOpenDropdown}
          className="h-[44px] text-[14px] font-[400] font-primary w-[100%]"
          open={openDropdown}
          options={dropdownData}
          {...fieldProps}
          data-testid={`select${name ?? ""}`}
        />
      </Form.Item>
    </div>
  );
};
