import PageTitleWrapper from "@/components/PageTitleWrapper";
import React, { FC, ReactNode } from "react";
import { Grid, Container, Card } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

interface IProfileUpdate {
  form: ReactNode;
}

const ProfileEdit: FC<IProfileUpdate> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Chỉnh sửa trang cá nhân"
          desc=" Đây là chi tiết thông tin cá nhân"
          isHaveNavigateButton={true}
          type="back"
          navigationName="Trở về thông tin cá nhân"
          link="/profile"
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
            {form}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ProfileEdit;
