import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Container, Grid, Card } from "@mui/material";
import Footer from "@/components/Footer";

interface IService {
  table: ReactNode;
}

const Service: FC<IService> = (props) => {
  const { table } = props;

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Danh sách dịch vụ"
          desc="Dưới đây là danh sách các dịch vụ trong hệ thống"
          isHaveNavigateButton={true}
          navigationName="Thêm dịch vụ"
          link="/admin/service/create"
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

export default Service;
