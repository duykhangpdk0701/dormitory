import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IComplaintList {
  list: ReactNode;
}

const ComplaintList: FC<IComplaintList> = (props) => {
  const { list } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Khiếu nại"
          desc="Dưới đây là danh sách khiếu nại của bạn"
          isHaveNavigateButton={true}
          navigationName="Tạo khiếu nại"
          link="/user/complaint/create"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{list}</Container>
      <Footer />
    </>
  );
};

export default ComplaintList;
