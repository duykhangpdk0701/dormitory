import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface ITaskCreate {
  form: ReactNode;
}

const TaskCreate: FC<ITaskCreate> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thêm công việc"
          desc="Tạo công việc mới"
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

export default TaskCreate;
