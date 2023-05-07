import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IRoomTypeCreate {
  form: ReactNode;
}

const RoomTypeCreate: FC<IRoomTypeCreate> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thêm dịch vụ"
          desc="Tạo dịch vụ mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách dịch vụ"
          link="/admin/service"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default RoomTypeCreate;
