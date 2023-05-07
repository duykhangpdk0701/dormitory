import ServiceCreate from "@/components/App/Admin/Service/Create";
import ServiceFormCreate from "@/components/App/Admin/Service/Create/Form";
import ComplaintCreate from "@/components/App/Complaint/Create";
import ComplaintFormCreate from "@/components/App/Complaint/Create/Form";
import PageHead from "@/components/PageHead";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IComplaintCreateParams {
  name: string;
  desc: string;
  price: number;
}

const complaintCreateSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
  price: yup.number().required(),
});

const ComplaintCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm<IComplaintCreateParams>({
    resolver: yupResolver(complaintCreateSchema),
  });

  const onSubmit: SubmitHandler<IComplaintCreateParams> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <PageHead title="Thêm dịch vụ ký túc xá | SGU domitory" />
      <ComplaintCreate
        form={
          <ComplaintFormCreate
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
          />
        }
      />
    </>
  );
};

ComplaintCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ComplaintCreatePage;
