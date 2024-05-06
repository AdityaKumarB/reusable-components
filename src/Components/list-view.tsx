import { VoidReturnType } from "@/utils/constants";
import { Space, Table, TableProps } from "antd";
import ListPagination from "./pagination";

export interface ListViewProps<T> extends TableProps<T> {
  data: T[];
  clearSelectedRows?: VoidReturnType;
  paginationData: { currentPage: number; pageSize: number; totalCount: number };
  onChangePagination: (pageSize: number, pageNumber: number) => void;
}

const ListView = <T extends { uid: string }>({
  data,
  clearSelectedRows,
  paginationData,
  onChangePagination,
  ...props
}: ListViewProps<T>) => {
  const defaultProps: TableProps<T> = {
    rowKey: (record) => record.uid,
    pagination: false,
    ...props,
  };

  return (
    <Space className="flex flex-col items-stretch">
      <Table dataSource={data} {...defaultProps} />
      <ListPagination
        current={paginationData.currentPage}
        pageSize={paginationData.pageSize}
        className="fixed bottom-0 formSubmitBar ml-[-10px] z-40"
        total={paginationData.totalCount}
        onChangePageSize={onChangePagination}
        onChange={(page) => {
          onChangePagination(paginationData.pageSize, page);
          clearSelectedRows?.();
        }}
      />
    </Space>
  );
};

export default ListView;
