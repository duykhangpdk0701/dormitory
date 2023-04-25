import AddPriority from "@/components/App/Admin/Priority/Create";
import PriorityFormAdd from "@/components/App/Admin/Priority/Create/Form";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface ICreatePriorityParams {
  name: string;
  score: number;
}

const createPrioritySchema = yup.object({
  name: yup.string().required("Hãy nhập tên độ ưu tiên"),
  score: yup.number().required("Hãy nhập điểm của độ ưu tiên"),
});

const PriorityCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit } = useForm<ICreatePriorityParams>({
    resolver: yupResolver(createPrioritySchema),
  });

  const onSubmit: SubmitHandler<ICreatePriorityParams> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Danh sách điểm ưu tiên | SGU domitory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddPriority
        form={
          <PriorityFormAdd
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

PriorityCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PriorityCreatePage;
