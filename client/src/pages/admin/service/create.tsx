import ServiceCreate from "@/components/App/Admin/Service/Create";
import ServiceFormCreate from "@/components/App/Admin/Service/Create/Form";
import PageHead from "@/components/PageHead";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IServiceCreateParams {
  name: string;
  desc: string;
  price: number;
}

const jobCreateSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
  price: yup.number().required(),
});

const ServiceCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm<IServiceCreateParams>({
    resolver: yupResolver(jobCreateSchema),
  });

  const onSubmit: SubmitHandler<IServiceCreateParams> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <PageHead title="Thêm dịch vụ ký túc xá | SGU domitory" />
      <ServiceCreate
        form={
          <ServiceFormCreate
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

ServiceCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ServiceCreatePage;
