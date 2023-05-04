import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/components/PageHeader";

interface IRooms {
  roomTypeTable: ReactNode;
}

const RoomType: FC<IRooms> = (props) => {
  const { roomTypeTable } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Danh sách loại phòng"
          desc="Dưới đây là danh sách các loại phòng trong hệ thống"
          isHaveNavigateButton={true}
          navigationName="Thêm loại phòng"
          link="/admin/room-type/create"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>{roomTypeTable}</Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default RoomType;
