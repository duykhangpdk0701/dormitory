import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface IProfileDetail {
  detail: ReactNode;
}

const ProfileDetail: FC<IProfileDetail> = (props) => {
  const { detail } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thông tin cá nhân"
          desc=" Đây là chi tiết thông tin cá nhân"
          isHaveNavigateButton={true}
          type="edit"
          navigationName="Chỉnh sửa"
          link="/profile/edit"
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

export default ProfileDetail;
