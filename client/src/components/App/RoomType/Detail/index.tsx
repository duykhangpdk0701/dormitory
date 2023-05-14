import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

interface IRoomTypeDetail {
  detail: ReactNode;
}

const RoomTypeDetail: FC<IRoomTypeDetail> = (props) => {
  const { detail } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chi tiết Phòng"
          desc=" Đây là chi tiết phòng"
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
            <Card>{detail}</Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default RoomTypeDetail;
