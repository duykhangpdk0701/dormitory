import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

interface IRoomDetail {
  detail: ReactNode;
}

const RoomDetail: FC<IRoomDetail> = (props) => {
  const { detail } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chi tiết Phòng"
          desc=" Đây là chi tiết phòng"
          isHaveNavigateButton={true}
          type="back"
          navigationName="Trở về danh sách phòng"
          link="/admin/room"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{detail}</Container>
      <Footer />
    </>
  );
};

export default RoomDetail;
