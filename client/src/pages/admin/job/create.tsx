import JobCreate from "@/components/App/Admin/Job/Create";
import ServiceFormCreate from "@/components/App/Admin/Job/Create/Form";
import PageHead from "@/components/PageHead";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface IJobCreateParmas {
  name: string;
  desc: string;
}

const jobCreateSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
});

const JobCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit } = useForm<IJobCreateParmas>({
    resolver: yupResolver(jobCreateSchema),
  });

  const onSubmit: SubmitHandler<IJobCreateParmas> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <PageHead title="Thêm công việc ký túc xá | SGU domitory" />
      <JobCreate
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

JobCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default JobCreatePage;
