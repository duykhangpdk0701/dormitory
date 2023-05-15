import adminPriorityAPI from "@/api/admin/priority";
import EditPriority from "@/components/App/Admin/Priority/Edit";
import PriorityFormEdit from "@/components/App/Admin/Priority/Edit/Form";
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

export interface IEditPriorityFormParams {
  name: string;
  score: number;
}

export interface IEditPriorityParams {
  id: string;
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
  const dispatch = useAppDispatch();

  const { control, handleSubmit, setValue } = useForm<IEditPriorityFormParams>({
    resolver: yupResolver(editPrioritySchema),
  });

  const priorityDetailQuery = useQuery({
    queryKey: ["room-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminPriorityAPI.getById(id);
      }

      return undefined;
    },
    onSuccess: (data) => {
      data?.name && setValue("name", data.name);
      data?.score && setValue("score", data.score);
    },
  });

  const priorityUpdateMutation = useMutation({
    mutationKey: ["priority"],
    mutationFn: ({ id, name, score }: IEditPriorityParams) =>
      adminPriorityAPI.update(id, name, score),
    onSuccess: async (data) => {
      setLoading(false);
      await router.push("/priority");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Cập nhật điểm ưu tiên thành công",
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

  const onSubmit: SubmitHandler<IEditPriorityFormParams> = async (data) => {
    const { name, score } = data;

    if (id && typeof id !== "object") {
      setLoading(true);
      await priorityUpdateMutation.mutateAsync({ id, name, score });
    } else {
      router.replace("/404");
    }
  };

  return (
    <>
      <PageHead title="Chỉnh sửa điểm ưu tiên | SGU domitory" />
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
