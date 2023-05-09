import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IStaffUpdate {
  form: ReactNode;
}

const StaffUpdate: FC<IStaffUpdate> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Cập nhật nhân viên"
          desc="Chỉnh sửa nhân viên"
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

export default StaffUpdate;
