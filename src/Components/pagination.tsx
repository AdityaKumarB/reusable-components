import { Pagination, PaginationProps, Select, Space } from "antd";
import classNames from "classnames";

interface ListPaginationProps extends PaginationProps {
  onChangePageSize?: (pageSize: number, pageNumber: number) => void;
  pageSizeOptions?: number[];
}
const ListPagination: React.FC<ListPaginationProps> = ({
  className,
  onChangePageSize = () => {},
  pageSizeOptions,
  ...props
}: ListPaginationProps) => {
  const options = pageSizeOptions?.map((number) => ({
    value: number,
    label: number,
  })) ?? [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 30, label: 30 },
    { value: 40, label: 40 },
    { value: 50, label: 50 },
  ];
  const defaultProps: PaginationProps = {
    defaultCurrent: 1,
    showSizeChanger: false,
    pageSize: options?.[0]?.label ?? 10,
    className: "pagination",
    ...props,
  };
  return (
    <Space
      className={classNames(
        "bg-white h-16 p-4 flex justify-between shadow-tableFooterShadow",
        className
      )}
    >
      <Space className="text-inActiveStatusTextColor text-[16px] font-[400] font-primary">
        Items per page
        <Select
          title=" "
          value={defaultProps.pageSize}
          onChange={(pageSize) => onChangePageSize(pageSize, 1)}
          options={options}
          data-testid="itemsPerPageSelect"
        />
      </Space>
      <Pagination
        showTitle={false}
        {...defaultProps}
        data-testid="pagination"
      />
    </Space>
  );
};

export default ListPagination;
