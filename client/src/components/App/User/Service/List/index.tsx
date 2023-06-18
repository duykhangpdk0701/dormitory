import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IServiceList {
  list: ReactNode;
}

const ServiceList: FC<IServiceList> = (props) => {
  const { list } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Danh sách Dịch vụ"
          desc="Dưới đây là danh dịch vụ có trong hệ thống"
          isHaveNavigateButton={false}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{list}</Container>
      <Footer />
    </>
  );
};

export default ServiceList;
