import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IServiceEnroll {
  form: ReactNode;
}

const ServiceEnroll: FC<IServiceEnroll> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Đăng ký dịch vụ"
          desc="Đăng ký sửa dụng dịch vụ"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách dịch vụ"
          link="/user/service"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default ServiceEnroll;
