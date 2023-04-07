import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Grid, Container } from "@mui/material";
import React from "react";
import AccountBalance from "./AccountBalance";
import AccountSecurity from "./AccountSecurity";
import PageHeader from "./PageHeader";
import Wallets from "./Wallets";
import WatchList from "./WatchList";

const Dashboard = () => {
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
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
