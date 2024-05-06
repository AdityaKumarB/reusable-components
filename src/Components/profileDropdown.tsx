import { Avatar, Dropdown, Space, Typography } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import MyProfile from "./myProfile";

const { Text } = Typography;
export interface UserCreds {
  name: string;
  email: string;
}

const UserAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");
  const displayInitials =
    initials.length > 1 ? initials : name.slice(0, 2).toUpperCase();
  return (
    <Avatar size={38} className="bg-themeBg">
      {displayInitials}
    </Avatar>
  );
};
const AccountMenu: React.FC<UserCreds> = ({ name, email }) => {
  const [openMyProfile, setOpenMyProfile] = useState(false);

  return (
    <>
      <Dropdown
        placement="bottomRight"
        trigger={["click"]}
        menu={{
          items: [
            {
              key: 1,
              label: (
                <Space className="flex items-start min-w-[264px]">
                  <UserAvatar name={name} />
                  <Space className="flex flex-col items-start gap-0">
                    <Text className="text-[16px] font-semibold" ellipsis={true}>
                      {name}
                    </Text>
                    <Text className="text-[14px]">{email}</Text>
                  </Space>
                </Space>
              ),
              className: "pointer-events-none p-3",
            },
            { type: "divider", className: "mx-[-5px] h-[1.5px]" },
            {
              key: 2,
              label: "My Profile",
              icon: (
                <Image
                  src="/assets/person.svg"
                  width={16}
                  height={16}
                  alt="Home"
                />
              ),
              className: "px-5 py-2",
              onClick: () => setOpenMyProfile(true),
            },
            { type: "divider", className: "mx-[-5px]" },
            {
              key: 3,
              label: "Logout",
              icon: (
                <Image
                  src="/assets/signOut.svg"
                  width={16}
                  height={16}
                  alt="Home"
                  data-testid="signOutIcon"
                />
              ),
              className: "px-5 py-2",
              onClick: () => {},
            },
          ],
        }}
      >
        <Space className="gap-1 cursor-pointer" data-testid="userDropdown">
          <UserAvatar name={name} />
          <Image
            src={require("../../public/assets/downArrow.svg")}
            height={20}
            width={20}
            alt=""
          />
        </Space>
      </Dropdown>
      <MyProfile
        open={openMyProfile}
        userCreds={{ name, email }}
        onClickClose={(close) => setOpenMyProfile(close)}
      />
    </>
  );
};

export default AccountMenu;
