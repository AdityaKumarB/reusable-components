export const CSVpreviewer = ({
  tableRows = [],
  values = [],
}: {
  tableRows: string[];
  values: any;
}) => {
  return (
    <table className="border-[1.5px] border-muted100 justify-stretch flex flex-col w-[100%]">
      <thead className="w-[100%] flex">
        <tr className="text-left border-b-[1.5px] border-b-muted100 flex w-[100%]">
          {tableRows.map((rows: any) => {
            return (
              <th
                key={rows}
                className="border-r-[1.5px] border-r-muted100 px-[5px] flex flex-1 w-[100%]"
              >
                {rows}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {values.map((value: [], index: number) => {
          return (
            <tr
              key={`value-${index + 1}`}
              className="border-b-[1.5px] border-b-muted100 flex w-[100%]"
            >
              {value.map((val: string) => {
                return (
                  <td
                    key={val}
                    className="border-r-[1.5px] border-r-muted100 px-[5px] flex flex-1 w-[100%]"
                  >
                    {val}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
