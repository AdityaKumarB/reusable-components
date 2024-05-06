import { VoidReturnType } from "@/utils/constants";
import { FormFieldsProps } from "@/utils/form-config";
import { capitalizeFirstLetter, preventSpaces } from "@/utils/mudles";
import {
  Checkbox,
  Form,
  FormInstance,
  FormItemProps,
  Input,
  InputProps,
  Space,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { FormLabel } from "./form-label";

export interface TextInputFieldProps extends FormFieldsProps {
  password?: boolean;
  fieldProps?: InputProps;
  formItemProps?: FormItemProps;
  showForgotPassword?: boolean;
  onClickForgotPassword?: VoidReturnType;
  showRememberMe?: boolean;
  onClickRememberMe?: (e: CheckboxChangeEvent) => void;
  checked?: boolean;
  direction?: any;
  form?: FormInstance<any>;
}

export const TextInputField = ({
  label,
  errorMessage = "Required",
  password = false,
  identifier,
  fieldProps,
  formItemProps,
  required = true,
  showForgotPassword = false,
  onClickForgotPassword = () => {},
  showRememberMe = false,
  onClickRememberMe = () => {},
  checked = false,
  direction = "vertical",
  form,
}: TextInputFieldProps) => {
  const inputClassname =
    "h-[44px] w-[100%] p-[12px] rounded-[6px] text-[14px] border-[1px] font-[400] font-primary";

  const [checkboxState, setCheckboxState] = useState(checked);

  const name = identifier ?? label;

  return (
    <>
      <div
        className={classNames(
          direction === "horizontal"
            ? "flex items-center mb-[24px]"
            : "flex flex-col",
          "w-[100%]"
        )}
      >
        <div className={`${direction === "horizontal" ? "w-[164px]" : ""} `}>
          <FormLabel {...{ label, required, direction }} />
        </div>
        <Form.Item
          name={name}
          rules={[{ required, message: errorMessage }]}
          colon={false}
          className={classNames(
            direction === "horizontal" ? "w-[50%] mb-[0px]" : "w-[100%]"
          )}
          {...formItemProps}
          data-testid="textInputFormItem"
        >
          {!password ? (
            <Input
              className={inputClassname}
              data-testid={`textInput${name ?? ""}`}
              onKeyDown={fieldProps?.onKeyDown ?? preventSpaces}
              min={0}
              onWheelCapture={(e: any) => {
                e.target?.blur();
              }}
              {...fieldProps}
              onChange={(event) => {
                const value = event?.target?.value;
                if (value?.trim()?.length === 0) {
                  form?.setFieldValue(name, undefined);
                } else if (name === NAME) {
                  form?.setFieldValue(name, capitalizeFirstLetter(value));
                } else if (fieldProps?.type === "number") {
                  const regex = /^\d*\.?\d{0,2}$/;
                  if (!regex.test(value)) {
                    const slicedValue = value.slice(0, -1);
                    form?.setFieldValue(name, slicedValue);
                  }
                }
              }}
            />
          ) : (
            <Input.Password
              className={inputClassname}
              data-testid="textInputPassword"
              visibilityToggle={true}
              iconRender={iconRender}
              maxLength={250}
              min={0}
              {...fieldProps}
            />
          )}
        </Form.Item>
      </div>
      <Space className="flex justify-between pb-[10px] -pt-[20px]">
        {showRememberMe && (
          <Checkbox
            className="text-[12px] font-[500] font-primary select-none"
            onChange={(e: CheckboxChangeEvent) => {
              onClickRememberMe(e);
              setCheckboxState(e.target.checked);
            }}
            required={false}
            checked={checkboxState}
            data-testid="rememberMeCheckbox"
          >{`Remember Me`}</Checkbox>
        )}
        {showForgotPassword && (
          <Space
            className="text-[14px] font-[600] font-primary cursor-pointer select-none"
            onClick={onClickForgotPassword}
            data-testid="forgotPassword"
          >{`Forgot Password`}</Space>
        )}
      </Space>
    </>
  );
};

const iconRender = (visible: boolean) => (
  <Image
    src={
      visible
        ? require("../../public/assets/eyeOn.svg")
        : require("../../public/assets/eyeOff.svg")
    }
    height={20}
    width={20}
    alt="Show Password"
    data-testid={visible ? "eyeOn" : "eyeOff"}
  />
);
