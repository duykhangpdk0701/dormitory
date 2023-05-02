import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface ICivilianCreate {
  form: ReactNode;
}

const CivilianCreate: FC<ICivilianCreate> = (props) => {
  const { form } = props;

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thêm cư dân"
          desc="Tạo cư dân mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách cư dân"
          link="/admin/civilian"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default CivilianCreate;
