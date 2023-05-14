import adminCivilianAPI from "@/api/admin/civilian";
import adminContractAPI from "@/api/admin/contract";
import adminJobAPI from "@/api/admin/job";
import adminRoomAPI from "@/api/admin/room";
import adminStaffAPI from "@/api/admin/staff";
import ContractCreate from "@/components/App/Admin/Contract/Create";
import ContractFormCreate from "@/components/App/Admin/Contract/Create/Form";
import Contract from "@/components/App/Admin/Contract/List";
import ContractTable from "@/components/App/Admin/Contract/List/ContractTable";
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
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";

export interface IContractCreateParmas {
  roomId: string;
  staffId: string;
  civilianId: string;
  totalPrice: number;
}

const contractCreateSchema = yup.object({
  roomId: yup.string().required(),
  staffId: yup.string().required(),
  civilianId: yup.string().required(),
  totalPrice: yup.string().required(),
});

const ContractCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roomListQuery = useQuery({
    queryKey: ["room"],
    queryFn: () => adminRoomAPI.getList(),
  });

  const staffListQuery = useQuery({
    queryKey: ["staff"],
    queryFn: () => adminStaffAPI.getList(),
  });

  const civilianListQuery = useQuery({
    queryKey: ["civilian"],
    queryFn: () => adminCivilianAPI.getList(),
  });

  const contractCreateMutation = useMutation({
    mutationKey: ["contract"],
    mutationFn: async ({
      roomId,
      staffId,
      civilianId,
      totalPrice,
    }: IContractCreateParmas) =>
      adminContractAPI.create(roomId, staffId, civilianId, totalPrice),
    onSuccess: async () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Tạo hợp đồng thành công",
        })
      );
      await router.push("/admin/contract");
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

  const { control, handleSubmit } = useForm<IContractCreateParmas>({
    resolver: yupResolver(contractCreateSchema),
  });

  const onSubmit: SubmitHandler<IContractCreateParmas> = async (data) => {
    const { roomId, staffId, civilianId, totalPrice } = data;
    setLoading(true);
    await contractCreateMutation.mutateAsync({
      roomId,
      staffId,
      civilianId,
      totalPrice,
    });
  };

  return (
    <>
      <PageHead title="Thêm hợp đồng ký túc xá | SGU domitory" />
      <ContractCreate
        form={
          <ContractFormCreate
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
            roomList={roomListQuery.data}
            isLoadingRoomList={roomListQuery.isLoading}
            staffList={staffListQuery.data}
            isLoadingStaffList={staffListQuery.isLoading}
            civilianList={civilianListQuery.data}
            isLoadingCivilianList={civilianListQuery.isLoading}
          />
        }
      />
    </>
  );
};

ContractCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ContractCreatePage;
