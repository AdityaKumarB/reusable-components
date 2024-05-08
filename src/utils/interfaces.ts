import { ButtonProps } from "antd";

export interface SecondaryButtonProps extends ButtonProps {
    title: string;
    loading?: boolean;
    ref?: any;
  }