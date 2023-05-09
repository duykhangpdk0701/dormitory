import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IJobEdit {
  form: ReactNode;
}

const JobEdit: FC<IJobEdit> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Cập nhật công việc"
          desc="Chỉnh sửa công việc "
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách công việc"
          link="/admin/job"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default JobEdit;
