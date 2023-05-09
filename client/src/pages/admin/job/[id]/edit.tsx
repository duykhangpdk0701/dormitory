import adminJobAPI from "@/api/admin/job";
import JobCreate from "@/components/App/Admin/Job/Create";
import JobFormCreate from "@/components/App/Admin/Job/Create/Form";
import JobEdit from "@/components/App/Admin/Job/Edit";
import JobFormEdit from "@/components/App/Admin/Job/Edit/Form";
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

export interface IJobEditFormParmas {
  name: string;
  desc: string;
}
export interface IJobEditParams {
  id: string;
  name: string;
  desc: string;
}

const jobEditSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
});

const JobEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue } = useForm<IJobEditFormParmas>({
    resolver: yupResolver(jobEditSchema),
  });

  const jobUpdateMutation = useMutation({
    mutationKey: ["job"],
    mutationFn: async ({ id, name, desc }: IJobEditParams) =>
      adminJobAPI.update(id, name, desc),
    onSuccess: async () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Cập nhật công việc thành công",
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

  const jobDetailQuery = useQuery({
    queryKey: ["job", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminJobAPI.getById(id);
      }
      return undefined;
    },
    onSuccess: (data) => {
      data?.name && setValue("name", data.name);
      data?.description && setValue("desc", data.description);
    },
  });

  const onSubmit: SubmitHandler<IJobEditFormParmas> = async (data) => {
    const { name, desc } = data;
    setLoading(true);
    if (id && typeof id !== "object") {
      await jobUpdateMutation.mutateAsync({ id, name, desc });
    }
  };

  return (
    <>
      <PageHead title="Thêm công việc ký túc xá | SGU domitory" />
      <JobEdit
        form={
          <JobFormEdit
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

JobEditPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default JobEditPage;
