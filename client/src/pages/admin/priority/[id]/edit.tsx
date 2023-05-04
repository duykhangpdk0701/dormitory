import adminPriority from "@/api/admin/priority";
import EditPriority from "@/components/App/Admin/Priority/Edit";
import PriorityFormEdit from "@/components/App/Admin/Priority/Edit/Form";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import * as yup from "yup";

export interface IEditPriorityParams {
  name: string;
  score: number;
}

const editPrioritySchema = yup.object({
  name: yup.string().required("Hãy nhập tên độ ưu tiên"),
  score: yup.number().required("Hãy nhập điểm của độ ưu tiên"),
});

const PriorityEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue } = useForm<IEditPriorityParams>({
    resolver: yupResolver(editPrioritySchema),
  });

  const priorityDetailQuery = useQuery({
    queryKey: ["room-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminPriority.getById(id);
      }

      return undefined;
    },
    onSuccess: (data) => {
      data?.name && setValue("name", data.name);
      data?.score && setValue("name", data.score.toString());
    },
  });

  const onSubmit: SubmitHandler<IEditPriorityParams> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Chỉnh sửa điểm ưu tiên | SGU domitory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditPriority
        form={
          <PriorityFormEdit
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

PriorityEditPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PriorityEditPage;
