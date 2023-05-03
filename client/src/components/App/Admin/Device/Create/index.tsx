import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IJobCreate {
  form: ReactNode;
}

const JobCreate: FC<IJobCreate> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thêm thêm thiết"
          desc="Tạo thiết bị mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách thiết bị"
          link="/admin/device"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default JobCreate;
