import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/components/PageHeader";

interface IRooms {
  roomsTable: ReactNode;
}

const Rooms: FC<IRooms> = (props) => {
  const { roomsTable } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Danh sách phòng"
          desc="Dưới đây là danh sách phòng trong hệ thống"
          isHaveNavigateButton={true}
          navigationName="Thêm phòng"
          link="/admin/room/create"
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
            <Card>{roomsTable}</Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Rooms;
