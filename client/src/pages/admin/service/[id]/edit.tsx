import adminServiceAPI from "@/api/admin/service";
import ServiceCreate from "@/components/App/Admin/Service/Create";
import ServiceFormCreate from "@/components/App/Admin/Service/Create/Form";
import ServiceEdit from "@/components/App/Admin/Service/Edit";
import ServiceFormEdit from "@/components/App/Admin/Service/Edit/Form";
import PageHead from "@/components/PageHead";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import * as yup from "yup";

export interface IServiceEditParams {
  name: string;
  desc: string;
  price: number;
}

const serviceEditSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
  price: yup.number().required(),
});

const ServiceEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { control, handleSubmit, setValue } = useForm<IServiceEditParams>({
    resolver: yupResolver(serviceEditSchema),
  });

  const roomTypeDetailQuery = useQuery({
    queryKey: ["room-type-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminServiceAPI.getById(id);
      }
    },
    onSuccess: (data) => {
      data?.name && setValue("name", data.name);
      data?.description && setValue("desc", data.description);
      data?.price && setValue("price", data.price);
    },
  });

  const onSubmit: SubmitHandler<IServiceEditParams> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <PageHead title="Thêm dịch vụ ký túc xá | SGU domitory" />
      <ServiceEdit
        form={
          <ServiceFormEdit
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

ServiceEditPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ServiceEditPage;
