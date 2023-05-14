import adminServiceAPI from "@/api/admin/service";
import ServiceEdit from "@/components/App/Admin/Service/Edit";
import ServiceFormEdit from "@/components/App/Admin/Service/Edit/Form";
import PageHead from "@/components/PageHead";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";

export interface IServiceFormEditParams {
  name: string;
  desc: string;
  price: number;
}

export interface IServiceEditParams {
  id: string;
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
  const { control, handleSubmit, setValue } = useForm<IServiceFormEditParams>({
    resolver: yupResolver(serviceEditSchema),
  });

  const serviceDetailQuery = useQuery({
    queryKey: ["service-detail", id],
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

  const serviceUpdateMutation = useMutation({
    mutationKey: ["service"],
    mutationFn: ({ id, name, desc, price }: IServiceEditParams) =>
      adminServiceAPI.update(id, name, desc, price),
    onSuccess: async (data) => {
      setLoading(false);
      await router.push("/admin/service");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Cập nhật dịch vụ thành công",
        })
      );
    },
    onError: (error: any) => {
      setLoading(false);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
    },
  });

  const onSubmit: SubmitHandler<IServiceFormEditParams> = async (data) => {
    if (id && typeof id !== "object") {
      setLoading(true);
      serviceUpdateMutation.mutate({ id, ...data });
    } else {
      router.replace("/404");
    }
  };

  return (
    <>
      <PageHead title="Cập dịch vụ ký túc xá | SGU domitory" />
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
