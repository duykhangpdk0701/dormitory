import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IBillCreate {
  form: ReactNode;
}

const BillCreate: FC<IBillCreate> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thêm hoá đơn"
          desc="Tạo hoá đơn mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách hoá đơn"
          link="/admin/bill"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default BillCreate;
