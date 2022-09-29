import React, { useCallback } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Menu, Input, Row, Col } from "antd";
import styled, { createGlobalStyle } from "styled-components";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput("");
  const router = useRouter();

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu
        mode="horizontal"
        selectedKeys={[router.pathname]}
        items={[
          {
            label: (
              <Link href="/">
                <a>노드버드</a>
              </Link>
            ),
            key: "/",
          },
          {
            label: (
              <Link href="/profile">
                <a>프로필</a>
              </Link>
            ),
            key: "/profile",
          },
          {
            label: (
              <SearchInput
                enterButton
                value={searchInput}
                onChange={onChangeSearchInput}
                onSearch={onSearch}
              />
            ),
            key: "/search",
          },
        ]}
      />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.zerocho.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by ZeroCho
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
