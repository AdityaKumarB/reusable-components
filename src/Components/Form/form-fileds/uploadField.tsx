import { FormFieldsProps } from "@/utils/form-config";
import { Form, FormItemProps, Space, Upload, UploadProps } from "antd";
import { FormInstance } from "antd/lib";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FormLabel } from "./form-label";

const { Dragger } = Upload;

interface UploadResponse {
  url?: string;
  token?: string;
  fileName: string;
  errorMessage: string;
  productCount: number;
  siteStats?: {
    active: number;
    expired: number;
    invalid: number;
  };
  title?: string;
}

interface UploadFieldProps extends FormFieldsProps {
  uploadType?: "png/jpeg" | "csv";
  fieldProps?: UploadProps;
  formItemProps?: FormItemProps;
  file?: any;
  form?: FormInstance<any>;
  url?: string;
  restrictUpload?: boolean;
}

interface FileComponentProps {
  fileProps?: {
    uploading: boolean;
    file: any;
    uploadComplete: boolean;
    url?: string;
    fileName?: string;
  };
  props?: any;
  fieldProps?: any;
  uploadType?: "png/jpeg" | "csv";
  setFileProps?: (e: any) => void;
  errorFooter?: {
    show: boolean | undefined;
    message: string;
  };
  onChange?: (e: any) => void;
  label?: string;
  url?: string;
  restrictUpload?: boolean;
  identifier?: string;
}

const pngImage = (uploadType: string, disabled: boolean = false) => {
  return uploadType === "png/jpeg" ? (
    <Image
      src={require("../../public/assets/image.svg")}
      width={29}
      height={29}
      alt=""
      data-testid="image"
    />
  ) : (
    <Image
      src={require(`../../public/assets/${
        disabled ? "inActiveFolder" : "folderArrowUp"
      }.svg`)}
      width={29}
      height={29}
      alt=""
      data-testid="folderArrowUp"
    />
  );
};

const Loader = () => (
  <Image
    src={require("../../public/assets/spinner.svg")}
    width={29}
    height={29}
    alt=""
    className="loader"
  />
);

const UploadCompletedView = () => (
  <Space
    direction="vertical"
    className="items-center"
    data-testid="uploadCompleteView"
  >
    <Image
      src={require("../../public/assets/checkmarkCircle.svg")}
      height={34}
      width={34}
      alt=""
    />
    <Space className="text-[12px] font-primary font-[500] text-paletteBlue">
      {`Uploaded Successfully`}
    </Space>
  </Space>
);

const fileUtils: { [key: string]: string } = {
  "image/jpeg": "png/jpeg",
  "image/png": "png/jpeg",
  "text/csv": "csv",
};

export const UploadField = ({
  label = "Product",
  errorMessage = "Required",
  formItemProps,
  fieldProps,
  identifier,
  uploadType = "png/jpeg",
  required = true,
  file,
  form,
  url,
  restrictUpload,
}: UploadFieldProps) => {
  const [showModal, setShowModal] = useState({
    show: false,
    message: "",
  });
  const [errorFooter, setErrorFooter] = useState<{
    show: boolean | undefined;
    message: string;
  }>({ show: undefined, message: "" });
  const [errorType, setErrorType] = useState<string>();

  const [fileProps, setFileProps] = useState<{
    uploading: boolean;
    file: any;
    uploadComplete: boolean;
    url?: string;
  }>({
    uploading: false,
    file,
    uploadComplete: false,
    url: undefined,
  });
  const fileData = useRef({ file, url });

  const fileCheckHandler = (file: any) => {
    const isValidType = fileUtils[file?.type] === uploadType;
    if (!isValidType) {
      setErrorType("type");
      setShowModal((prev) => ({
        ...prev,
        show: true,
        message: `Please upload ${uploadType} file`,
      }));
      return false;
    }

    const isValidSize = file.size <= 2000000; // Move this to constants
    if (!isValidSize) {
      setErrorType("size");
      setShowModal((prev) => ({
        ...prev,
        show: true,
        message:
          uploadType === "png/jpeg"
            ? "Image uploaded is not within the size limit. Try uploading again"
            : "File uploaded is not within the size limit. Try uploading again",
      }));
      return false;
    }

    errorFooter.show &&
      setErrorFooter((prev) => ({
        ...prev,
        show: false,
        message: "",
      }));
    return true;
  };

  const clearFileHandler = () => {
    form?.setFieldValue(identifier ?? label, undefined);
  };

  const tokenSetHandler = ({
    response,
    info,
  }: {
    response?: UploadResponse;
    info: any;
  }) => {
    form?.setFieldValue(identifier ?? label, {
      file: info.file,
      url: uploadType === "png/jpeg" ? response?.url : response?.token,
      productCount: response?.productCount,
      fileName: response?.fileName,
    });
    setFileProps((prev) => ({
      ...prev,
      uploading: false,
      uploadComplete: true,
      file: info.file,
      url: uploadType === "png/jpeg" ? response?.url : response?.token,
      fileName: response?.fileName,
    }));
  };

  const uploadSuccessHandler = ({
    response,
    info,
  }: {
    response?: UploadResponse;
    info: any;
  }) => {
    if (response?.url || response?.token) {
      tokenSetHandler({ response, info });
    } else {
      if (
        uploadType === "csv" &&
        ((response?.siteStats?.expired ?? 0) > 0 ||
          (response?.siteStats?.invalid ?? 0) > 0)
      ) {
        setErrorFooter((prev) => ({
          ...prev,
          show: true,
          message: `Active = ${response?.siteStats?.active} | Expired = ${response?.siteStats?.expired}`,
        }));
      } else {
        setErrorFooter((prev) => ({
          ...prev,
          show: true,
          message: response?.errorMessage ?? "",
        }));
      }
      setFileProps((prev) => ({
        ...prev,
        uploading: false,
      }));
      clearFileHandler();
    }
  };

  const uploadErrorHandler = (response: UploadResponse) => {
    clearFileHandler();
    setFileProps((prev) => ({
      ...prev,
      uploading: false,
    }));
    setErrorFooter((prev) => ({
      ...prev,
      show: true,
      message: response?.title ?? "",
    }));
  };

  const uploadingFileHandler = () => {
    setFileProps((prev) => ({
      ...prev,
      uploading: true,
    }));
    clearFileHandler();
  };

  const onFileChange = async (info: { file: any }) => {
    form?.validateFields([identifier ?? label]);
    if (info === undefined) {
      clearFileHandler();
    } else if (fileData?.current?.url && fileData?.current?.file) {
      const values = form?.getFieldsValue();
      form?.setFieldsValue({
        ...values,
        [identifier ?? label]: {
          file,
          url,
        },
      });
      setFileProps((prev) => ({
        ...prev,
        uploading: false,
        uploadComplete: true,
        file,
        url,
      }));
    } else if (info && fileCheckHandler(info.file)) {
      const file = info?.file;
      const response = file?.response;
      if (file?.status === "done") {
        uploadSuccessHandler({ response, info });
      } else if (file?.status === "error") {
        uploadErrorHandler(response);
      } else if (file?.status === "uploading") {
        uploadingFileHandler();
      }
    } else {
      clearFileHandler();
    }
  };

  useEffect(() => {
    if (fieldProps?.disabled) {
      setFileProps((prev) => ({
        ...prev,
        uploadComplete: false,
        file,
      }));
      form?.setFieldValue(identifier, { file: undefined, url });
    }
  }, [fieldProps?.disabled]);

  useEffect(() => {
    fileData.current.file = file;
    fileData.current.url = url;
    file && url && form?.validateFields([identifier ?? label]);
    if (url === "sitesFile") {
      setFileProps((prev) => ({
        ...prev,
        uploading: false,
        uploadComplete: true,
        file,
        url,
      }));
    } else if (url === "reset") {
      setFileProps((prev) => ({
        ...prev,
        uploading: false,
        uploadComplete: false,
        file,
        url,
      }));
    }
  }, [file, url]);

  const sizeLimitErrorMessage = () => {
    return uploadType == "png/jpeg"
      ? "Image not within size limit"
      : "CSV not within size limit";
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      return fileCheckHandler(file);
    },
    action: `my-url`, // Update URL
    headers: { Authorization: "token" }, // Update token
  };

  return (
    <>
      <FormLabel {...{ label, required }} />
      <Form.Item
        name={identifier ?? label}
        rules={[{ required, message: errorMessage }]}
        colon={false}
        {...formItemProps}
        className="w-[100%]"
      >
        <FileComponent
          {...{
            fileProps,
            props,
            fieldProps,
            uploadType,
            setFileProps,
            errorFooter,
            label,
            url,
            restrictUpload,
            identifier,
          }}
          onChange={(e) => {
            if (e == undefined) {
              fileData.current.file = undefined;
              fileData.current.url = undefined;
            }
            onFileChange(e);
          }}
        />
      </Form.Item>
    </>
  );
};

const FileUploadStatus = ({
  fileProps,
}: {
  fileProps: FileComponentProps["fileProps"];
}) => {
  if (fileProps?.uploading) {
    return <Loader />;
  }
  if (fileProps?.uploadComplete) {
    return <UploadCompletedView />;
  }
  return null;
};

const FileComponent = ({
  fileProps,
  props,
  fieldProps,
  uploadType = "png/jpeg",
  setFileProps,
  errorFooter,
  onChange = () => {},
  label,
  restrictUpload,
  identifier,
}: FileComponentProps) => {
  useEffect(() => {
    if (fieldProps?.disabled) {
      onChange(undefined);
    } else {
      fileProps?.file && onChange({ file: fileProps?.file });
    }
  }, [fieldProps]);

  const isDisabled = fieldProps?.disabled;

  return (
    <div>
      {!fileProps?.file && (
        <Dragger
          {...props}
          onChange={onChange}
          accept={uploadType === "png/jpeg" ? "image/png, image/jpeg" : ".csv"}
          maxCount={1}
          showUploadList={false}
          {...fieldProps}
          data-testid={`file-input${identifier ?? label}`}
          className={isDisabled ? "inActive" : "active"}
        >
          <Space
            direction="vertical"
            className="items-center justify-center h-[112px]"
          >
            <FileUploadStatus fileProps={fileProps} />

            {!fileProps?.uploading && !fileProps?.uploadComplete && (
              <>
                {pngImage(uploadType, isDisabled)}
                <div
                  className="text-[12px] font-primary font-[400] text-paletteGray"
                  data-testid="uploadTypeHeader"
                >
                  {`Drag or drop or `}
                  <span
                    data-testid={`choose${identifier ?? label}`}
                    className={classNames(
                      "font-[700] font-primary text-[12px]",
                      isDisabled ? "text-mutedText" : "text-paletteBlue"
                    )}
                  >
                    choose a file
                  </span>
                  {` to upload`}
                </div>
                <Space
                  className={classNames(
                    "text-[10px] font-primary",
                    isDisabled ? "text-mutedText" : "text-paletteBlue"
                  )}
                >
                  {uploadType === "png/jpeg" ? "JPEG or PNG" : ".csv file"}
                </Space>
              </>
            )}
          </Space>
        </Dragger>
      )}
    </div>
  );
};
