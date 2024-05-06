import { ChangeEvent, RefObject, useState } from "react";
import { VoidReturnType } from "../utils/constants";

interface UploadStatus {
  show: boolean;
  message: string;
  type: "error" | "success";
}

const UploadCSV = ({
  inputRef,
  successCallback,
}: {
  inputRef: RefObject<HTMLInputElement>;
  successCallback?: VoidReturnType;
}) => {
  const [uploadError, setUploadError] = useState<UploadStatus>({
    show: false,
    message: "",
    type: "error",
  });

  const CloseInformPopup = () =>
    setUploadError((prev) => ({ ...prev, show: false }));

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e?.target?.files?.[0];
    if (selectedFile == undefined) {
      setUploadError({
        show: true,
        message: "File not found",
        type: "error",
      });
      return;
    }

    const { size, type } = selectedFile;
    if (size > 2000000) {
      setUploadError({
        show: true,
        message:
          "File uploaded is not within the size limit. Try uploading again",
        type: "error",
      });
    } else if (type !== "text/csv") {
      setUploadError({
        show: true,
        message: "Please upload a CSV file",
        type: "error",
      });
    } else {
      const formData = new FormData();
      formData.append("file", selectedFile);
    }
  };

  return (
    <input
      accept=".csv"
      type="file"
      ref={inputRef}
      className="h-[0px] w-[0px] hidden"
      onChange={handleFileChange}
      data-testid="file-input"
    />
  );
};

export default UploadCSV;
