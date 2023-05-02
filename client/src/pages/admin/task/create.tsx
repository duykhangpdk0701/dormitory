import adminStaffAPI from "@/api/admin/staff";
import adminTaskAPI from "@/api/admin/task";
import TaskCreate from "@/components/App/Admin/Task/Create";
import TaskFormCreate from "@/components/App/Admin/Task/Create/Form";
import PageHead from "@/components/PageHead";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";

export interface ITaskCreateParams {
  staffId: string;
  desc: string;
  dateAssign: Date;
}

const taskCreateSchema = yup.object({
  staffId: yup.string().required(),
  desc: yup.string().required(),
  dateAssign: yup.date().required(),
});

const TaskCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const staffListQuery = useQuery({
    queryKey: ["staff"],
    queryFn: () => adminStaffAPI.getList(),
  });

  const taskCreateMutation = useMutation({
    mutationKey: ["task"],
    mutationFn: async ({ staffId, desc, dateAssign }: ITaskCreateParams) =>
      adminTaskAPI.create(staffId, desc, dateAssign),
    onSuccess: async () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Tạo nhiệm vụ thành công",
        })
      );
      await router.push("/admin/task");
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

  const { control, handleSubmit } = useForm<ITaskCreateParams>({
    resolver: yupResolver(taskCreateSchema),
  });

  const onSubmit: SubmitHandler<ITaskCreateParams> = async (data) => {
    const { staffId, desc, dateAssign } = data;
    setLoading(true);
    await taskCreateMutation.mutateAsync({ staffId, desc, dateAssign });
  };

  return (
    <>
      <PageHead title="Thêm nhiệm vụ ký túc xá | SGU domitory" />
      <TaskCreate
        form={
          <TaskFormCreate
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
            isLoadingStaff={staffListQuery.isLoading}
            staff={staffListQuery.data}
          />
        }
      />
    </>
  );
};

TaskCreatePage.getLayout = function getLayout(page: ReactNode) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default TaskCreatePage;
