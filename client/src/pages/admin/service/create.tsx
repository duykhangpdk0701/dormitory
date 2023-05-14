import adminServiceAPI from "@/api/admin/service";
import ServiceCreate from "@/components/App/Admin/Service/Create";
import ServiceFormCreate from "@/components/App/Admin/Service/Create/Form";
import PageHead from "@/components/PageHead";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";

export interface IServiceCreateParams {
  name: string;
  desc: string;
  price: number;
}

const serviceCreateSchema = yup.object({
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
    resolver: yupResolver(serviceCreateSchema),
  });

  const serviceCreateMutation = useMutation({
    mutationKey: ["service"],
    mutationFn: ({ name, desc, price }: IServiceCreateParams) =>
      adminServiceAPI.create(name, desc, price),
    onSuccess: async () => {
      setLoading(false);
      await router.push("/priority");
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

  const onSubmit: SubmitHandler<IServiceCreateParams> = async (data) => {
    setLoading(true);
    serviceCreateMutation.mutate(data);
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
