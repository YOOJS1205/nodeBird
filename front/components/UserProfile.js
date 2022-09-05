import React, { useCallback } from "react";
import { Avatar, Card, Button } from "antd";

export default function UserProfile({ setIsLoggedIn }) {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followers">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta title="Junsang" avatar={<Avatar>JS</Avatar>} />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
}
