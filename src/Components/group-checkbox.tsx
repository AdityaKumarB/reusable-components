import { Button, Checkbox, CheckboxOptionType, Empty, Space } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";
import SearchBar from "./searchBar";

export interface FilterComponentProps extends CheckboxGroupProps {
  options: CheckboxOptionType[];
  showSeeAll?: boolean;
  showSearch?: boolean;
  onChangeChecked?: (checked: CheckboxValueType[]) => void;
}

const FilterComponent = ({
  options,
  showSearch = true,
  showSeeAll = true,
  onChangeChecked,
  ...props
}: FilterComponentProps) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredOptions = options.filter((option) =>
    option.value.toString().toLowerCase().includes(searchValue.toLowerCase())
  );
  const slicedOptions = showAll
    ? filteredOptions
    : filteredOptions.slice(0, Math.min(5, filteredOptions.length));

  return (
    <Space className="flex flex-col items-stretch gap-2">
      {showSearch && (
        <SearchBar
          className="w-full"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      )}
      <Checkbox.Group
        options={slicedOptions}
        className="flex flex-col gap-3"
        onChange={onChangeChecked}
        {...props}
        data-testid="filterCheckbox"
      />
      {slicedOptions.length < 1 && <Empty />}
      {showSeeAll && filteredOptions.length > 5 && (
        <Button
          type="text"
          className="p-0 hover:bg-white font-medium"
          onClick={() => setShowAll((prevShowAll) => !prevShowAll)}
          data-testid="showAndHideButton"
        >
          {showAll ? "Show less..." : "Show all..."}
        </Button>
      )}
    </Space>
  );
};

export default FilterComponent;
