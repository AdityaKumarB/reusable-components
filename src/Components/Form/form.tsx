import { SecondaryButtonProps } from "@/utils/interfaces";
import { Form, FormProps } from "antd";
import { FormInstance } from "antd/lib";
import classNames from "classnames";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import {
  DATE_PICKER,
  MULTI_SELECT,
  RADIO,
  SINGLE_SELECT,
  TEXT_AREA,
  TEXT_EDITOR,
  TEXT_FIELD,
  TIME_PICKER,
  UPLOAD,
} from "../../utils/constants";
import { FormConfigData } from "../../utils/form-config";
import { FormBottomActionBar } from "./bottomActionBar";
import { DatePickerField } from "./form-fileds/date-picker-field";
import { DropdownField } from "./form-fileds/dropdown-field";
import { RadioButtonField } from "./form-fileds/radio-button-field";
import { TextAreaField } from "./form-fileds/text-area-field";
import TextEditor from "./form-fileds/text-editor";
import { TextInputField } from "./form-fileds/textInputField";
import { TimePickerField } from "./form-fileds/timePickerField";
import { UploadField } from "./form-fileds/uploadField";

export interface FormComponentProps {
  formConfig?: (FormConfigData[] | FormConfigData)[];
  submitButtonProps?: SecondaryButtonProps;
  submitText?: string;
  enableDraftButton?: boolean;
  button1Props?: SecondaryButtonProps;
  button2Props?: SecondaryButtonProps;
  fullSubmitButton?: boolean;
  className?: string;
  enablePadding?: boolean;
  formProps?: FormProps;
  showBottomActionBar?: boolean;
  bottomActionBarClassName?: string;
  formClassName?: string;
  submitButtonLoading?: boolean;
  button1Loading?: boolean;
  button2Loading?: boolean;
  renderItem?: React.ReactNode;
  fixActionBarAtBottom?: boolean;
  bottomActionBarStyle?: CSSProperties;
  formSubmittable?: boolean;
  canSubmit?: (submit: boolean) => void;
  getFormInstance?: (form: FormInstance<any>) => void;
  submitButtonRef?: any;
  saveAsDraftButtonProps?: SecondaryButtonProps;
  layout?: "horizontal" | "vertical";
}

export const FormComponent = ({
  formConfig = [],
  submitText = "Submit",
  submitButtonProps,
  enableDraftButton = false,
  button1Props,
  button2Props,
  fullSubmitButton = false,
  className,
  enablePadding = true,
  formProps,
  showBottomActionBar = true,
  bottomActionBarClassName = "",
  formClassName,
  submitButtonLoading = false,
  button1Loading = false,
  button2Loading = false,
  fixActionBarAtBottom = true,
  renderItem,
  bottomActionBarStyle = {},
  formSubmittable = true,
  canSubmit,
  getFormInstance,
  submitButtonRef,
  saveAsDraftButtonProps,
  layout = "vertical",
}: FormComponentProps) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const formFields: any = {
    [TEXT_FIELD]: TextInputField,
    [SINGLE_SELECT]: DropdownField,
    [MULTI_SELECT]: DropdownField,
    [DATE_PICKER]: DatePickerField,
    [TIME_PICKER]: TimePickerField,
    [TEXT_AREA]: TextAreaField,
    [UPLOAD]: UploadField,
    [RADIO]: RadioButtonField,
    [TEXT_EDITOR]: TextEditor,
  };

  const [formInitialValues, setFormInitialValues] = useState({});
  const [submittable, setSubmittable] = useState(false);

  const initialValuesHandler = useCallback(() => {
    const object: { [key: string]: string } = {};
    formConfig?.flat()?.map((item: FormConfigData) => {
      object[item?.identifier ?? item.label ?? ""] =
        item?.formItemProps?.initialValue;
    });
    setFormInitialValues(object);
  }, [formConfig]);

  const formValidationHandler = async () => {
    getFormInstance?.(form);
    form?.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
        canSubmit?.(true);
      },
      (e) => {
        if (e?.errorFields?.length === 0) {
          setSubmittable(true);
          canSubmit?.(true);
        } else {
          setSubmittable(false);
          canSubmit?.(false);
        }
      }
    );
  };

  useEffect(() => {
    initialValuesHandler();
    formValidationHandler();
  }, [formConfig]);

  useEffect(() => {
    formValidationHandler();
  }, [values]);

  useEffect(() => {
    form.setFieldValue(formInitialValues, "");
  }, [form, formInitialValues]);

  const renderFormFields = (
    data: (FormConfigData[] | FormConfigData)[],
    form: FormInstance<any>
  ) => {
    return data?.map((item: any, index: number) => {
      if (Array?.isArray(item)) {
        return (
          <div key={`field-${index + 1}`} className="flex gap-[16px]">
            {renderFormFields(item, form)}
          </div>
        );
      } else {
        const Field = formFields[item?.type];
        return (
          Field && (
            <div
              key={item?.label}
              style={{ width: item?.width ?? "100%" }}
              className="flex flex-col"
            >
              <Field {...{ ...item, form, direction: layout }} />
            </div>
          )
        );
      }
    });
  };

  return (
    <div className={classNames("w-[100%] bg-[white]")}>
      {formConfig?.length > 0 && (
        <Form
          form={form}
          className={classNames("relative bg-[white] w-[100%]", formClassName)}
          initialValues={formInitialValues}
          style={{ paddingBottom: enablePadding ? 50 : 0 }}
          {...formProps}
          data-testid="form"
          layout="vertical"
        >
          <div className={className}>
            {renderFormFields(formConfig, form)}
            {renderItem}
          </div>
          {showBottomActionBar && (
            <FormBottomActionBar
              {...{
                fullSubmitButton,
                bottomActionBarClassName,
                enableDraftButton,
                button1Props,
                button1Loading,
                button2Props,
                button2Loading,
                submitText,
                submitButtonLoading,
                submitButtonProps,
                submittable: submittable && formSubmittable,
                fixedAtBottom: fixActionBarAtBottom,
                bottomActionBarStyle,
                submitButtonRef,
                saveAsDraftButtonProps,
              }}
            />
          )}
        </Form>
      )}
    </div>
  );
};
