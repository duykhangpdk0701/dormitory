import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "../../../../PageHeader";

interface IAwaitingStudentRequest {
  table: ReactNode;
}

const AwaitingStudentRequest: FC<IAwaitingStudentRequest> = (props) => {
  const { table } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title=" Danh sách sinh viên đợi duyệt"
          desc=" Đây là danh sách sinh viên đã đăng ký và chưa được duyệt"
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
            <Card>{table}</Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AwaitingStudentRequest;
