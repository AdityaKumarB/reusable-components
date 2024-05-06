import {
  DatePickerProps,
  FormItemProps,
  InputProps,
  SelectProps,
  TimePickerProps,
  UploadProps,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { VoidReturnType } from "./constants";

export interface FormFieldsProps {
  label?: string;
  errorMessage?: string;
  identifier?: string;
  required?: boolean;
}

export interface FormConfigData extends FormFieldsProps {
  type:
    | "text_field"
    | "single_select"
    | "multi_select"
    | "date_picker"
    | "time_picker"
    | "text_area"
    | "upload"
    | "radio"
    | "text_editor";
  password?: boolean;
  dropdownData?: { label: string; value: string | number; title?: string }[];
  format?: DatePickerProps["format"] | TimePickerProps["format"];
  uploadType?: "png/jpeg" | "csv";
  options?: string[];
  width?: string;
  fieldProps?:
    | InputProps
    | SelectProps
    | DatePickerProps
    | TimePickerProps
    | UploadProps
    | { prefix: any };
  formItemProps?: FormItemProps;
  showForgotPassword?: boolean;
  onClickForgotPassword?: VoidReturnType | Promise<void>;
  showRememberMe?: boolean;
  onClickRememberMe?: (e: CheckboxChangeEvent) => void | Promise<void>;
  url?: string;
  file?: any;
  fileName?: string;
  fileSize?: number;
  checked?: boolean;
  fileList?: any;
  fileUrl?: string;
  value?: string | number;
  restrictUpload?: boolean;
  showTooltip?: boolean;
  tooltipTitle?: string;
}

export const maxLengthCheckHandler = ({
  value,
  name = "Field",
  maxLength = 15,
  type = "number",
}: {
  value: string;
  name?: string;
  maxLength?: number;
  type?: "number" | "text";
}) => {
  if (value?.length > maxLength)
    return Promise.reject(
      new Error(
        `${name} cannot exceed ${maxLength} ${
          type === "number" ? "digits" : "characters"
        } `
      )
    );
};
