import adminJobAPI from "@/api/admin/job";
import JobCreate from "@/components/App/Admin/Job/Create";
import JobFormCreate from "@/components/App/Admin/Job/Create/Form";
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

  const jobCreateMutation = useMutation({
    mutationKey: ["task"],
    mutationFn: async ({ name, desc }: IJobCreateParmas) =>
      adminJobAPI.create(name, desc),
    onSuccess: async () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Tạo công việc thành công",
        })
      );
      await router.push("/admin/job");
      setLoading(false);
    },
    onError: (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
      setLoading(false);
    },
  });

  const { control, handleSubmit } = useForm<IJobCreateParmas>({
    resolver: yupResolver(jobCreateSchema),
  });

  const onSubmit: SubmitHandler<IJobCreateParmas> = async (data) => {
    const { name, desc } = data;
    setLoading(true);
    await jobCreateMutation.mutateAsync({ name, desc });
  };

  return (
    <>
      <PageHead title="Thêm công việc ký túc xá | SGU domitory" />
      <JobCreate
        form={
          <JobFormCreate
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
