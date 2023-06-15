import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

interface ICivilianDetail {
  detail: ReactNode;
}

const CivilianDetail: FC<ICivilianDetail> = (props) => {
  const { detail } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chi tiết Cư dân"
          desc=" Đây là chi tiết Cư dân"
          isHaveNavigateButton
          type="back"
          navigationName="Về trang danh sách"
          link="/admin/civilian"
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
            {detail}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CivilianDetail;
