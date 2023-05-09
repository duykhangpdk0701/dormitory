import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface IAddRoom {
  form: ReactNode;
}

const EditPermission: FC<IAddRoom> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Cập nhật quyền sửa quyền"
          desc="Chỉnh sửa quyền"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách Quyền"
          link="/admin/permission"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default EditPermission;
