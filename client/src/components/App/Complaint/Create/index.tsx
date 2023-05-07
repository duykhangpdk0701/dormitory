import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IComplaintCreate {
  form: ReactNode;
}

const ComplaintCreate: FC<IComplaintCreate> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Tạo khiếu nại"
          desc="Tạo khiếu nại mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách khiều nại"
          link="/complaint"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default ComplaintCreate;
