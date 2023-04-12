import React from "react";
import { Grid, Container } from "@mui/material";
import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import RecentOrders from "./RecentOrders";

const AwaitingStudentRequest = () => {
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
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AwaitingStudentRequest;
