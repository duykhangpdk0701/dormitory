import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface IEditRoom {
  form: ReactNode;
}

const EditRoom: FC<IEditRoom> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Sửa thông tin phòng"
          desc="Sửa thông tin phòng"
          isHaveNavigateButton={true}
          type="back"
          navigationName="Trở về danh sách phòng"
          link="/admin/room"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default EditRoom;
