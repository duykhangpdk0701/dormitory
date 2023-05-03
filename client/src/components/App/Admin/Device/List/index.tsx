import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Container, Grid, Card } from "@mui/material";
import Footer from "@/components/Footer";

interface IDevice {
  table: ReactNode;
}

const Device: FC<IDevice> = (props) => {
  const { table } = props;

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Danh sách thiết bị"
          desc="Dưới đây là danh sách các thiết bị trong hệ thống"
          isHaveNavigateButton={true}
          navigationName="Thêm thiết bị"
          link="/admin/device/create"
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
            <Card>{table}</Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Device;
