import adminBillAPI from "@/api/admin/bill";
import adminCivilianAPI from "@/api/admin/civilian";
import adminRoomAPI from "@/api/admin/room";
import BillCreate from "@/components/App/Admin/Bill/Create";
import BillFormCreate from "@/components/App/Admin/Bill/Create/Form";
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

export interface IBillCreateParmas {
  roomId: string;
  civilianId: string;
  totalPrice: number;
}

const billCreateSchema = yup.object({
  roomId: yup.string().required(),
  civilianId: yup.string().required(),
  totalPrice: yup.number().required(),
});

const BillCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roomListQuery = useQuery({
    queryKey: ["room"],
    queryFn: () => adminRoomAPI.getList(),
  });

  const civilianListQuery = useQuery({
    queryKey: ["civilianId"],
    queryFn: () => adminCivilianAPI.getList(),
  });

  const billCreateMutation = useMutation({
    mutationKey: ["task"],
    mutationFn: async ({ roomId, civilianId, totalPrice }: IBillCreateParmas) =>
      adminBillAPI.create(roomId, civilianId, totalPrice),
    onSuccess: async () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Tạo hoá đơn thành công",
        })
      );
      await router.push("/admin/bill");
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

  const { control, handleSubmit } = useForm<IBillCreateParmas>({
    resolver: yupResolver(billCreateSchema),
  });

  const onSubmit: SubmitHandler<IBillCreateParmas> = async (data) => {
    const { roomId, civilianId, totalPrice } = data;
    setLoading(true);
    await billCreateMutation.mutateAsync({ roomId, civilianId, totalPrice });
  };

  return (
    <>
      <PageHead title="Thêm hoá đơn ký túc xá | SGU domitory" />
      <BillCreate
        form={
          <BillFormCreate
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
            roomList={roomListQuery.data}
            isLoadingRoomList={roomListQuery.isLoading}
            civilianList={civilianListQuery.data}
            isLoadingCivilian={civilianListQuery.isLoading}
          />
        }
      />
    </>
  );
};

BillCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default BillCreatePage;
