import adminCivilianAPI from "@/api/admin/civilian";
import adminContractAPI from "@/api/admin/contract";

import adminRoomAPI from "@/api/admin/room";
import adminStaffAPI from "@/api/admin/staff";
import ContractEdit from "@/components/App/Admin/Contract/Edit";
import ContractFormEdit from "@/components/App/Admin/Contract/Edit/Form";

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

export interface IContractEditFormParmas {
  roomId: string;
  staffId: string;
  civilianId: string;
  totalPrice: number;
}
export interface IContractEditParams {
  id: string;
  roomId: string;
  staffId: string;
  civilianId: string;
  totalPrice: number;
}

const contractEditSchema = yup.object({
  roomId: yup.string().required(),
  staffId: yup.string().required(),
  civilianId: yup.string().required(),
  totalPrice: yup.number().required(),
});

const ContractEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue } = useForm<IContractEditFormParmas>({
    resolver: yupResolver(contractEditSchema),
  });

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

  const contractDetailQuery = useQuery({
    queryKey: ["contract", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminContractAPI.getById(id);
      }
      return undefined;
    },
    onSuccess: (data) => {
      data?.roomId && setValue("roomId", data.roomId);
      data?.civilianId && setValue("civilianId", data.civilianId);
      data?.staffId && setValue("staffId", data.staffId);
      data?.totalPrice && setValue("totalPrice", data.totalPrice);
    },
    enabled:
      civilianListQuery.isFetched &&
      staffListQuery.isFetched &&
      roomListQuery.isFetched,
  });

  const contractUpdateMutation = useMutation({
    mutationKey: ["contract"],
    mutationFn: async ({
      id,
      roomId,
      staffId,
      civilianId,
      totalPrice,
    }: IContractEditParams) =>
      adminContractAPI.update(id, roomId, staffId, civilianId, totalPrice),
    onSuccess: async () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Cập nhật hợp đồng thành công",
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

  const onSubmit: SubmitHandler<IContractEditFormParmas> = async (data) => {
    const { roomId, civilianId, staffId, totalPrice } = data;
    setLoading(true);
    if (id && typeof id !== "object") {
      await contractUpdateMutation.mutateAsync({
        id,
        roomId,
        civilianId,
        staffId,
        totalPrice,
      });
    }
  };

  return (
    <>
      <PageHead title="Cập nhật hợp đồng ký túc xá | SGU domitory" />
      <ContractEdit
        form={
          <ContractFormEdit
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

ContractEditPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ContractEditPage;
