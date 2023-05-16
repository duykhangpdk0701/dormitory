import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Container, Grid, Card } from "@mui/material";
import Footer from "@/components/Footer";

interface IBill {
  table: ReactNode;
}

const Bill: FC<IBill> = (props) => {
  const { table } = props;

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Danh sách Hoá đơn"
          desc="Dưới đây là danh sách các hoá đơn trong hệ thống"
          isHaveNavigateButton={true}
          navigationName="Thêm hoá đơn"
          link="/admin/bill/create"
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

export default Bill;
