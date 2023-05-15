import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

interface IBillDetail {
  detail: ReactNode;
}

const BillDetail: FC<IBillDetail> = (props) => {
  const { detail } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chi tiết hợp đồng"
          desc=" Đây là chi tiết hợp đồng "
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách hợp đồngk"
          link="/admin/bill"
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

export default BillDetail;
