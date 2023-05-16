import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IBillList {
  list: ReactNode;
}

const BillList: FC<IBillList> = (props) => {
  const { list } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Danh sách hoá đơn"
          desc="Dưới đây là danh sách hoá đơn của bạn"
          isHaveNavigateButton={false}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{list}</Container>
      <Footer />
    </>
  );
};

export default BillList;
