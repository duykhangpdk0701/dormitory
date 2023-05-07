import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

interface IAwaitingStudentRequestDetail {
  detail: ReactNode;
}

const AwaitingStudentRequestDetail: FC<IAwaitingStudentRequestDetail> = (
  props
) => {
  const { detail } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chi tiết sinh viên đợi duyệt"
          desc=" Đây là chi tiết sinh viên đã đăng ký và chưa được duyệt"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách sinh viên đợi duyệt"
          link="/admin/awaiting-student"
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

export default AwaitingStudentRequestDetail;
