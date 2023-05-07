import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IRoomTypeEdit {
  form: ReactNode;
}

const RoomTypeEdit: FC<IRoomTypeEdit> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chỉnh sửa loại phòng"
          desc="Chỉnh sửa loại phòng"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách loại phòng "
          link="/admin/room-type"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default RoomTypeEdit;
