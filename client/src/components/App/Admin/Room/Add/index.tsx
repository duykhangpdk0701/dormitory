import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface IAddRoom {
  form: ReactNode;
}

const AddRoom: FC<IAddRoom> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thêm phòng"
          desc="Tạo Phòng mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách phòng"
          link="/admin/room"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default AddRoom;
