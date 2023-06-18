import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

interface IServiceDetail {
  detail: ReactNode;
}

const ServiceDetail: FC<IServiceDetail> = (props) => {
  const { detail } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chi tiết dịch vụ"
          desc=" Đây là chi dịch vụ"
          isHaveNavigateButton={true}
          type="back"
          navigationName="Trở về danh sách dịch vụ"
          link="/user/service"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{detail}</Container>
      <Footer />
    </>
  );
};

export default ServiceDetail;
