import adminComplaintAPI from "@/api/admin/complaint";
import ServiceCreate from "@/components/App/Admin/Service/Create";
import ServiceFormCreate from "@/components/App/Admin/Service/Create/Form";
import ComplaintCreate from "@/components/App/Complaint/Create";
import ComplaintFormCreate from "@/components/App/Complaint/Create/Form";
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

export interface IComplaintCreateFormParams {
  name: string;
  desc: string;
}

interface IComplaintCreateParams {
  name: string;
  desc: string;
  civilianId: string;
}

const complaintCreateSchema = yup.object({
  name: yup.string().required("Vui lòng hãy điền tiêu đề!"),
  desc: yup.string().required("Vui lòng hãy điền mô tả!"),
});

const ComplaintCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm<IComplaintCreateFormParams>({
    resolver: yupResolver(complaintCreateSchema),
  });

  const complaintMutatation = useMutation({
    mutationKey: ["complaint"],
    mutationFn: ({ name, desc, civilianId }: IComplaintCreateParams) =>
      adminComplaintAPI.create(name, desc, civilianId),
    onSuccess: async () => {
      await router.push("/user/complaint");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Tạo yêu cầu thàng công thành công",
        })
      );
      setLoading(false);
    },
    onError: async (error: any) => {
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

  const onSubmit: SubmitHandler<IComplaintCreateFormParams> = async (data) => {
    const { name, desc } = data;
    setLoading(true);
    const civilianId = sessionStorage.getItem("id");
    if (civilianId) {
      complaintMutatation.mutateAsync({ name, desc, civilianId });
    } else {
      await router.push("/auth/login");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Vui lòng đăng nhập",
        })
      );
    }
  };

  return (
    <>
      <PageHead title="Tạo khiếu nại | SGU domitory" />
      <ComplaintCreate
        form={
          <ComplaintFormCreate
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

ComplaintCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default ComplaintCreatePage;
