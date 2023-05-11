import adminViolationAPI from "@/api/admin/violation";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { useAppDispatch } from "@/hooks/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { NextPageWithLayout } from "@/pages/_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHead from "@/components/PageHead";
import ViolationCreate from "@/components/App/Admin/Violation/Create";
import ViolationFormCreate from "@/components/App/Admin/Violation/Create/Form";
import adminCivilianAPI from "@/api/admin/civilian";

export interface IViolationCreateParmas {
  title: string;
  civilianId: string;
  desc: string;
}

const violationCreateSchema = yup.object({
  title: yup.string().required(),
  civilianId: yup.string().required(),
  desc: yup.string().required(),
});

const CreateViolationPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const civilianListQuery = useQuery({
    queryKey: ["civilian"],
    queryFn: () => adminCivilianAPI.getList(),
  });

  const jobCreateMutation = useMutation({
    mutationKey: ["task"],
    mutationFn: async ({ title, desc, civilianId }: IViolationCreateParmas) =>
      adminViolationAPI.create(title, civilianId, desc),
    onSuccess: async () => {
      await router.push("/admin/violation");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Tạo vi phạm thành công",
        })
      );
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

  const { control, handleSubmit } = useForm<IViolationCreateParmas>({
    resolver: yupResolver(violationCreateSchema),
  });

  const onSubmit: SubmitHandler<IViolationCreateParmas> = async (data) => {
    const { title, desc, civilianId } = data;
    setLoading(true);
    await jobCreateMutation.mutateAsync({ title, desc, civilianId });
  };

  return (
    <>
      <PageHead title="Tạo vi phạm | ký túc xá đại học Sài Gòn" />
      <ViolationCreate
        form={
          <ViolationFormCreate
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
            civilian={civilianListQuery.data}
            isLoadingCivilian={civilianListQuery.isLoading}
          />
        }
      />
    </>
  );
};

CreateViolationPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default CreateViolationPage;
