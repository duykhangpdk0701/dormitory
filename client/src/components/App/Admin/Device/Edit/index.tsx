import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IDeviceEdit {
  form: ReactNode;
}

const DeviceEdit: FC<IDeviceEdit> = (props) => {
  const { form } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Cập nhật thiết bị"
          desc="Chỉnh sửa bị mới"
          isHaveNavigateButton={true}
          navigationName="Trở về danh sách thiết bị"
          link="/admin/device"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">{form}</Container>
      <Footer />
    </>
  );
};

export default DeviceEdit;
