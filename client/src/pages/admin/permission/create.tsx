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
import { useMutation } from "react-query";
import adminPermission from "@/api/admin/permission";
import { useAppDispatch } from "@/hooks/redux";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";

export interface ICreatePermissionParams {
  name: string;
  desc: string;
}

const createPermissionSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
});

const PermissionCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createPermissionMutation = useMutation({
    mutationKey: ["permission"],
    mutationFn: ({ name, desc }: ICreatePermissionParams) =>
      adminPermission.create(name, desc),
    onSuccess: async () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Tạo quyền thành công",
        })
      );
      await router.push("admin/permission");
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

  const { control, handleSubmit } = useForm<ICreatePermissionParams>({
    resolver: yupResolver(createPermissionSchema),
  });

  const onSubmit: SubmitHandler<ICreatePermissionParams> = async (data) => {
    const { name, desc } = data;
    setLoading(true);
    await createPermissionMutation.mutateAsync({ name, desc });
  };

  return (
    <>
      <PageHead title="Tạo quyền mới | SGU domitory" />
      <AddPermission
        form={
          <PermissionForm
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
