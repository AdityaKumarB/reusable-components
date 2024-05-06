import { SearchOutlined } from "@ant-design/icons";
import { Input, InputProps } from "antd";
import classNames from "classnames";

const SearchBar = ({ className, ...props }: InputProps) => {
  return (
    <Input
      data-testid="search-icon"
      placeholder="Search"
      allowClear
      className={classNames(
        "h-[38px] font-[400] text-[16px] text-themeBg",
        className
      )}
      prefix={<SearchOutlined className="text-[gray]" />}
      {...props}
    />
  );
};

export default SearchBar;
