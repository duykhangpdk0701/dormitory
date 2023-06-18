import adminServiceAPI from "@/api/admin/service";
import ServiceEnroll from "@/components/App/User/Service/Enroll";
import ServiceFormEnroll from "@/components/App/User/Service/Enroll/Form";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import * as yup from "yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/hooks/redux";
import serviceUsageAPI from "@/api/serviceUsageAPI";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";

export interface IEnrollServiceParams {
  serviceId: string;
  civilianId: string;
  desc: string;
}

export interface IEnrollServiceFormParams {
  desc: string;
}

const enrollServiceFormPSchema = yup.object({
  desc: yup.string(),
});

const EnrollServicePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const serviceQuery = useQuery({
    queryKey: ["service"],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminServiceAPI.getById(id);
      }
      return undefined;
    },
  });

  const { control, handleSubmit } = useForm<IEnrollServiceFormParams>({
    resolver: yupResolver(enrollServiceFormPSchema),
  });

  const enrollUsageServiceMutation = useMutation({
    mutationKey: ["usage-service"],
    mutationFn: ({ serviceId, civilianId, desc }: IEnrollServiceParams) =>
      serviceUsageAPI.create(serviceId, civilianId, desc),
    onSuccess: async () => {
      await router.push("/user/service");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Đăng ký thành công",
        })
      );
      setLoading(false);
    },
    onError: async (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.messages,
        })
      );
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<IEnrollServiceFormParams> = async (data) => {
    const { desc } = data;
    setLoading(true);
    const civilianId = sessionStorage.getItem("id");

    if (!civilianId) {
      router.push("/auth/login");
      return;
    }

    if (id && typeof id !== "object" && civilianId) {
      await enrollUsageServiceMutation.mutateAsync({
        serviceId: id,
        civilianId,
        desc,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <PageHead title="Đăng ký dịch vụ | SGU domitory" />
      <ServiceEnroll
        form={
          <ServiceFormEnroll
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
            service={serviceQuery.data}
            isLoadingService={serviceQuery.isLoading}
          />
        }
      />
    </>
  );
};

EnrollServicePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default EnrollServicePage;
