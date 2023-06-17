import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IRequestChangeRoom {
  form: ReactNode;
}

const RequestChangeRoom: FC<IRequestChangeRoom> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Tạo yêu cầu chuyển phòng"
          desc="Tạo yêu cầu chuyển phòng"
          isHaveNavigateButton={true}
          type="back"
          navigationName="Trở về Trang chủ"
          link="/user/room"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default RequestChangeRoom;
