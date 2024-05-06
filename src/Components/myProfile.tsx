import { CloseCircleOutlined } from "@ant-design/icons";
import { Drawer, Typography } from "antd";
import { FormConfigData } from "../utils/form-config";
import { FormComponent } from "./Form/form";
import { UserCreds } from "./profileDropdown";

const { Title } = Typography;
const MyProfile = ({
  open,
  userCreds,
  onClickClose,
}: {
  userCreds: UserCreds;
  open: boolean;
  onClickClose: (close: boolean) => void;
}) => {
  const FormConfigData: FormConfigData[] = [
    {
      type: "text_field",
      label: "Name",
      formItemProps: { initialValue: userCreds.name },
      fieldProps: { disabled: true },
    },
    {
      type: "text_field",
      label: "Email Id",
      formItemProps: { initialValue: userCreds.email },
      fieldProps: { disabled: true },
    },
  ];

  return (
    <Drawer
      title={<Title level={4}>{`My Profile`}</Title>}
      extra={
        <CloseCircleOutlined
          className="text-[gray]"
          data-testid={"closeMyProfile"}
          onClick={() => onClickClose(false)}
        />
      }
      onClose={() => onClickClose(false)}
      closable={false}
      open={open}
      className="min-w-[300px]"
      width={"26vw"}
      data-testid="drawer"
    >
      <FormComponent
        formConfig={FormConfigData}
        showBottomActionBar={false}
        className="p-[0px]"
      />
    </Drawer>
  );
};

export default MyProfile;
