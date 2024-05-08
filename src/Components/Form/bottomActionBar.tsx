import { Button, Tooltip } from "antd";
import classNames from "classnames";
import { CSSProperties } from "react";

import {
  PrimaryButton,
  SecondaryButton,
  SecondaryButtonProps,
} from "../buttons";
import { FormComponentProps } from "./form";

interface FormBottomActionBarProps extends FormComponentProps {
  submittable?: boolean;
  fixedAtBottom?: boolean;
  bottomActionBarStyle?: CSSProperties;
  submitButtonRef?: any;
  saveAsDraftButtonProps?: SecondaryButtonProps;
}

export const FormBottomActionBar = ({
  fullSubmitButton,
  bottomActionBarClassName,
  enableDraftButton,
  button1Props,
  button1Loading,
  button2Props,
  button2Loading,
  submitText = "Submit",
  submitButtonLoading,
  submitButtonProps,
  submittable = false,
  fixedAtBottom = true,
  bottomActionBarStyle = {},
  submitButtonRef,
  saveAsDraftButtonProps,
}: FormBottomActionBarProps) => {
  return (
    <div style={{ ...bottomActionBarStyle }}>
      {!fullSubmitButton ? (
        <div
          className={classNames(
            "flex justify-between bg-[white] pr-[8px] pl-[20px] z-50",
            fixedAtBottom
              ? "fixed bottom-0 w-[100%] shadow-tableFooterShadow py-[8px]"
              : "border-t-[1px] border-t-muted200 !py-[24px]",
            bottomActionBarClassName
          )}
        >
          {enableDraftButton ? (
            <Button
              className="text-[14px] font-[600] font-primary border-[0px] self-center p-[0px] bg-[white]"
              data-testid="saveAsDraft"
              {...saveAsDraftButtonProps}
            >
              {"Save as draft"}
            </Button>
          ) : (
            !fullSubmitButton && <div data-testid="emptyDiv"></div>
          )}
          <div>
            {button1Props?.title && (
              <SecondaryButton
                className={classNames(
                  "mr-[20px]",
                  button1Props?.disabled && "bg-sideBarTextColor"
                )}
                loading={button1Loading}
                {...button1Props}
              />
            )}
            {button2Props?.title && (
              <SecondaryButton
                loading={button2Loading}
                {...button2Props}
                className={classNames(
                  "mr-[20px]",
                  button2Props?.disabled && "opacity-30"
                )}
              />
            )}
            {!fullSubmitButton && (
              <Tooltip
                title={
                  submittable
                    ? ""
                    : "Please provide all the mandatory details to proceed"
                }
              >
                <PrimaryButton
                  title={submitText}
                  loading={submitButtonLoading}
                  htmlType="submit"
                  disabled={!submittable}
                  {...submitButtonProps}
                  ref={submitButtonRef}
                  data-testid="primaryButton"
                />
              </Tooltip>
            )}
          </div>
        </div>
      ) : (
        <PrimaryButton
          title={submitText}
          loading={submitButtonLoading}
          htmlType="submit"
          className={classNames("w-[100%] mt-[56px]")}
          disabled={!submittable}
          ref={submitButtonRef}
        />
      )}
    </div>
  );
};
