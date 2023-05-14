import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IComplaintList {
  list: ReactNode;
}

const ContractList: FC<IComplaintList> = (props) => {
  const { list } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Hợp đồng"
          desc="Dưới đây là danh sách hợp đồng của bạn"
          isHaveNavigateButton={false}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{list}</Container>
      <Footer />
    </>
  );
};

export default ContractList;
