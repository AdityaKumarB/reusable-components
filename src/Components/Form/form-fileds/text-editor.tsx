import { FormFieldsProps, maxLengthCheckHandler } from "@/utils/form-config";
import { Form, FormItemProps, Input, InputProps, Space, Switch } from "antd";
import { FormInstance } from "antd/lib";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { isUrl } from "../../../utils/mudles";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export interface TextEditorProps extends FormFieldsProps {
  label: string;
  showSwitch?: boolean;
  form?: FormInstance<any>;
  formItemProps?: FormItemProps;
  fieldProps?: ReactQuillProps & InputProps;
}
const TextEditor = ({
  label,
  form,
  fieldProps,
  showSwitch = true,
  formItemProps,
  identifier,
}: TextEditorProps) => {
  const [editorState, setEditorState] = useState<"URL" | "Editor">("URL");
  useEffect(() => {
    if (!showSwitch) {
      setEditorState("Editor");
    }
  }, [showSwitch]);
  const [inputValue, setInputValue] = useState<string>();
  const [quillValue, setQuillValue] = useState<string>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleQuillChange = (value?: string) => {
    setQuillValue(value);
    form?.setFieldValue(identifier, editorState === "URL" ? inputValue : value);
  };

  useEffect(() => {
    setEditorState(isUrl(formItemProps?.initialValue) ? "URL" : "Editor");
  }, [formItemProps]);

  const editorModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };

  const eidtorFormats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const name = identifier ?? label;

  return (
    <Form.Item
      name={name}
      required={fieldProps?.readOnly !== true}
      colon={false}
      data-testid="textEditorFormItem"
      rules={[
        editorState === "URL"
          ? { type: "url", message: "Please enter a valid URL" }
          : {},
        {
          validator(_, value) {
            if (!value) {
              return Promise.reject(new Error("Required"));
            }
            if (value?.length > 2000)
              return maxLengthCheckHandler({
                value,
                name: "Terms and Conditions",
                maxLength: 2000,
                type: "text",
              });
            return Promise.resolve();
          },
        },
      ]}
      label={
        <Space className="flex gap-4">
          {label}
          {showSwitch && fieldProps?.readOnly !== true && (
            <Switch
              value={editorState === "URL"}
              onChange={(isUrl) => {
                setEditorState(isUrl ? "URL" : "Editor");
                form?.setFieldValue(
                  identifier,
                  isUrl ? inputValue : quillValue
                );
              }}
              checkedChildren="URL"
              unCheckedChildren="Editor"
              defaultChecked
              className={
                editorState === "URL" ? "bg-themeBg" : "bg-selectedMenuBg"
              }
            />
          )}
        </Space>
      }
      {...formItemProps}
      className="w-[100%]"
    >
      {editorState === "Editor" && (
        <ReactQuill
          placeholder="Enter here"
          theme="snow"
          value={quillValue}
          onChange={(value, delta, source, editor) => {
            const text = editor.getText();
            handleQuillChange(text.trim().length === 0 ? undefined : value);
            text.trim().length === 0;
          }}
          className={classNames(
            "h-[200px] font-primary flex flex-col items-stretch",
            fieldProps?.readOnly && "preview"
          )}
          modules={editorModules}
          formats={eidtorFormats}
          {...fieldProps}
          data-testid="editorTestIdtermsAndConditions"
        />
      )}
      {editorState === "URL" && (
        <Input
          placeholder="Enter here"
          value={inputValue}
          onChange={handleInputChange}
          className={classNames("h-12 text-[#4e4ef1]")}
          data-testid={`urlTestIdtermsAndConditions`}
          readOnly={fieldProps?.readOnly}
        />
      )}
    </Form.Item>
  );
};

export default TextEditor;
