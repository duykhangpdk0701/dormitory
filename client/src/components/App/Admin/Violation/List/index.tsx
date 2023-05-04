import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Container, Grid, Card } from "@mui/material";
import Footer from "@/components/Footer";

interface IViolation {
  table: ReactNode;
}

const Violation: FC<IViolation> = (props) => {
  const { table } = props;

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Danh sách vi phạm"
          desc="Dưới đây là danh sách các hành động vi phạm trong hệ thống"
          isHaveNavigateButton={true}
          navigationName="Thêm vi phạm"
          link="/admin/violation/create"
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

export default Violation;
