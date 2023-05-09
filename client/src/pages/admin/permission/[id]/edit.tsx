import AddPermission from "@/components/App/Admin/Permission/Add";
import PermissionForm from "@/components/App/Admin/Permission/Add/Form";
import Permission from "@/components/App/Admin/Permission/List";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import adminPermissionAPI from "@/api/admin/permission";
import { useAppDispatch } from "@/hooks/redux";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import EditPermission from "@/components/App/Admin/Permission/Edit";
import PermissionFormEdit from "@/components/App/Admin/Permission/Edit/Form";

export interface IUpdatePermissionFormParams {
  name: string;
  desc: string;
}

export interface IUpdatePermissionParams {
  id: string;
  name: string;
  desc: string;
}

const createPermissionSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
});

const PermissionCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue } =
    useForm<IUpdatePermissionFormParams>({
      resolver: yupResolver(createPermissionSchema),
    });

  const permissionDetailQuery = useQuery({
    queryKey: ["permission", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminPermissionAPI.getById(id);
      }
      return undefined;
    },
    onSuccess: (data) => {
      data?.name && setValue("name", data.name);
      data?.description && setValue("desc", data.description);
    },
  });

  const updatePermissionMutation = useMutation({
    mutationKey: ["permission"],
    mutationFn: ({ id, name, desc }: IUpdatePermissionParams) =>
      adminPermissionAPI.update(id, name, desc),

    onSuccess: async () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Cập nhật quyền thành công",
        })
      );
      await router.push("/admin/permission");
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

  const onSubmit: SubmitHandler<IUpdatePermissionFormParams> = async (data) => {
    const { name, desc } = data;
    setLoading(true);
    if (id && typeof id !== "object") {
      await updatePermissionMutation.mutateAsync({ id, name, desc });
    }
  };

  return (
    <>
      <PageHead title="Cập nhật quyền mới | SGU domitory" />
      <EditPermission
        form={
          <PermissionFormEdit
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

PermissionCreatePage.getLayout = function getLayout(page: ReactNode) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PermissionCreatePage;
