import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IComplaintList {
  list: ReactNode;
}

const StaffTaskList: FC<IComplaintList> = (props) => {
  const { list } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Nhiệm vụ"
          desc="Dưới đây là danh sách nhiệm vụ của bạn"
          isHaveNavigateButton={false}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{list}</Container>
      <Footer />
    </>
  );
};

export default StaffTaskList;
