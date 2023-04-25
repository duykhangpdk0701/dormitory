import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "./PageHeader";

interface IRooms {
  roomTypeTable: ReactNode;
}

const RoomType: FC<IRooms> = (props) => {
  const { roomTypeTable: roomsTable } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
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

export default RoomType;
