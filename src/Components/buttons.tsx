import { LoadingOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import classNames from "classnames";

export interface SecondaryButtonProps extends ButtonProps {
  title: string;
  loading?: boolean;
  ref?: any;
}
export const SecondaryButton = ({
  title,
  className,
  loading,
  ...props
}: SecondaryButtonProps) => {
  return (
    <Button
      key={title}
      className={
        "border-black rounded-md h-10 text-black font-primary text-[14px] select-none " +
        className
      }
      {...props}
      data-testid="secondaryButton"
    >
      {loading ? (
        <LoadingOutlined
          className="text-[16px]"
          data-testid="loadingOutlined"
        />
      ) : (
        title
      )}
    </Button>
  );
};
export const PrimaryButton = ({
  title,
  className,
  loading,
  ref,
  ...props
}: SecondaryButtonProps) => {
  className = props.disabled ? className + " opacity-70" : className;
  return (
    <Button
      key={title}
      className={
        "bg-buttonBg text-white rounded-md h-[42px] font-primary text-[14px] select-none font-[500] " +
        className
      }
      {...props}
      data-testid="primaryButton"
      ref={ref}
    >
      {loading ? (
        <LoadingOutlined
          className="text-[16px]"
          data-testid="loadingOutlined"
        />
      ) : (
        title
      )}
    </Button>
  );
};

interface AddModuleButtonProps extends ButtonProps {
  title: string;
  isUpload?: boolean;
}
export const AddModuleButton = ({
  title,
  isUpload,
  className,
  ...props
}: AddModuleButtonProps) => {
  return (
    <Button
      data-testid="addModuleButton"
      className={classNames(
        "bg-buttonBg text-[white] h-[38px] flex items-center",
        className
      )}
      {...props}
    >
      {title}
    </Button>
  );
};
