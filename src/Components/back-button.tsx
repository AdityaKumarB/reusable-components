import { VoidReturnType } from "@/utils/constants";
import { LeftOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useRouter } from "next/router";

export interface TitleWithBackProps {
  title: string;
  className?: string;
  backHandlerClassName?: string;
  onClick?: VoidReturnType;
  id?: string;
}

export const BackhandlerWithTitle: React.FC<TitleWithBackProps> = ({
  title,
  className,
  backHandlerClassName,
  onClick,
  id,
}) => {
  const router = useRouter();
  const buttonClick = onClick ?? router.back;
  return (
    <Space className="flex flex-col items-start justify-start gap-[6px]">
      <Space
        className={"border-none flex items-center " + backHandlerClassName}
        data-testid="routerBack"
      >
        <LeftOutlined
          className="text-[#222020] w-[20px] h-[20px] cursor-pointer"
          data-testid="backIcon"
          onClick={buttonClick}
        />
        <Space
          className={"cursor-pointer font-primary font-bold ml-1 " + className}
          data-testid="backhandlerTitle"
          onClick={buttonClick}
        >
          {title}
        </Space>
      </Space>
      <Space className="font-normal text-[14px] text-[#222020] ml-8 ">
        {id}
      </Space>
    </Space>
  );
};
