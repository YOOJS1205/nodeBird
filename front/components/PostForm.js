import React, { useCallback, useState } from "react";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";

export default function PostForm() {
  const [text, setText] = useState("");
  const { imagePaths } = useSelector((state) => state.post);
  const onSubmit = useCallback(() => {}, []);
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);
  return (
    <Form
      style={{ marign: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden />
        <Button>업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}
