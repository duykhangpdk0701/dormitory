import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IJobCreate {
  form: ReactNode;
}

const ContractCreate: FC<IJobCreate> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thêm hợp đồng"
          desc="Tạo hợp đồng mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách hợp đồng"
          link="/admin/contract"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default ContractCreate;
