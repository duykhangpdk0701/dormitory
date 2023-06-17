import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/components/PageHeader";

interface IRooms {
  requestChangeRoomTable: ReactNode;
}

const AdminRequestChangeRoom: FC<IRooms> = (props) => {
  const { requestChangeRoomTable } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Danh sách yêu cầu chuyển phòng"
          desc="Dưới đây là danh sách yêu cầu chuyển phòng trong hệ thống"
          isHaveNavigateButton={false}
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
            <Card>{requestChangeRoomTable}</Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AdminRequestChangeRoom;
