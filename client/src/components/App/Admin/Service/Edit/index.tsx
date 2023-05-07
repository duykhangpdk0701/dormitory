import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IServiceEdit {
  form: ReactNode;
}

const ServiceEdit: FC<IServiceEdit> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Cập nhật dịch vụ"
          desc="Chỉnh sửa dịch vụ"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách dịch vụ"
          link="/admin/service"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default ServiceEdit;
