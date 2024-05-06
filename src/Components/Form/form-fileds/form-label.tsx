import classNames from "classnames";

export type FormLabelProps = {
  label?: string;
  required?: boolean;
  direction?: string;
};

export const FormLabel = ({ label, required, direction }: FormLabelProps) => {
  return label ? (
    <div
      className={classNames(
        direction === "horizontal" ? " font-normal" : " font-semibold",
        "pb-[4px] text-[14px] font-primary"
      )}
      data-testid="formLabel"
    >
      {label}
      {required && (
        <span className="text-[red] pl-[4px]" data-testid="astrick">
          {"*"}
        </span>
      )}
    </div>
  ) : (
    <div data-testid="emptyDiv"></div>
  );
};
