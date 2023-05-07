import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface IEditPriority {
  form: ReactNode;
}

const EditPriority: FC<IEditPriority> = (props) => {
  const { form } = props;

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chỉnh sửa Điểm ưu tiên"
          desc="Chỉnh sửa quyền ưu tiên mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách điểm ưu tiên"
          link="/admin/priority"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default EditPriority;
