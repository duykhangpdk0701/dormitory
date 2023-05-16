import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

interface IJobDetail {
  detail: ReactNode;
}

const StaffTaskDetail: FC<IJobDetail> = (props) => {
  const { detail } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chi tiết công việc"
          desc=" Đây là chi tiết công việc "
          isHaveNavigateButton={false}
          navigationName="Trở về danh sách công việc"
          link="/admin/task"
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

export default StaffTaskDetail;
