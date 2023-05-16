import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

interface IUserBIllDetail {
  detail: ReactNode;
}

const UserBillDetail: FC<IUserBIllDetail> = (props) => {
  const { detail } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chi tiết hoá đơn"
          desc=" Đây là chi tiết hoá đơn"
          isHaveNavigateButton={false}
          navigationName="Trở về danh sách hoá đơn"
          link="/user/bill"
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

export default UserBillDetail;
