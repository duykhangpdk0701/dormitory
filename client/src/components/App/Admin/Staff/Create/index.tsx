import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IStaffCreate {
  form: ReactNode;
}

const StaffCreate: FC<IStaffCreate> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thêm nhân viên"
          desc="Thêm nhân viên mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách nhân viên"
          link="/admin/staff"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default StaffCreate;
