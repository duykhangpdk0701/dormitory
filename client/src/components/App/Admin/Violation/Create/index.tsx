import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IViolationCreate {
  form: ReactNode;
}

const ViolationCreate: FC<IViolationCreate> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thêm vi phạm"
          desc="Tạo vi phạm mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách vi phạm"
          link="/admin/violation"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default ViolationCreate;
