import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface IAddPriority {
  form: ReactNode;
}

const AddPriority: FC<IAddPriority> = (props) => {
  const { form } = props;

  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Thêm Điểm ưu tiên"
          desc="Tạo quyền ưu tiên mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách điểm ưu tiên"
          link="/admin/priority"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default AddPriority;
