import { Space, Switch, SwitchProps } from "antd";
export interface CampaignStateProps extends SwitchProps {
  value: boolean;
  isDisable?: boolean;
  onChange?: (checked: boolean) => void;
  testIdentifier?: string;
}
export const CampaignState = ({
  onChange,
  value,
  isDisable,
  testIdentifier = "",
}: CampaignStateProps) => {
  return (
    <Space className="flex justify-center">
      <Switch
        value={value}
        disabled={isDisable}
        className={value ? "bg-statusButtonBg" : "bg-draftedStatusBg"}
        data-testid={`campaignSwitch${testIdentifier}`}
      />
    </Space>
  );
};
