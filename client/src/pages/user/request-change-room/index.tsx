import PageHead from "@/components/PageHead";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import requestChangeRoomeAPI from "@/api/requestChangeRoom";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { IComplaintCreateFormParams } from "../complaint/create";
import RequestChangeRoom from "@/components/App/RequestChangeRoom/Create";
import RequestChangeRoomFormCreate from "@/components/App/RequestChangeRoom/Create/Form";
import roomTypeAPI from "@/api/roomType";

export interface IRequestChangeRoomePage {
  accountId: string;
  roomType: string;
  reason: string;
}

export interface IRequestChangeRoomFormPage {
  roomType: string;
  reason: string;
}

const requestChangeRoomSchema = yup.object({
  roomType: yup.string().required("Vui lòng chọn loại phòng"),
  reason: yup.string().required("Vui lòng nhập lý do"),
});

const RequestChangeRoomPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm<IRequestChangeRoomFormPage>({
    resolver: yupResolver(requestChangeRoomSchema),
  });

  const roomTypeQuery = useQuery({
    queryKey: ["room-type"],
    queryFn: () => roomTypeAPI.getListOfRoom(),
  });

  const requestChangeRoomMutation = useMutation({
    mutationKey: ["request-change-room"],
    mutationFn: ({ accountId, roomType, reason }: IRequestChangeRoomePage) =>
      requestChangeRoomeAPI.create(accountId, roomType, reason),
    onSuccess: async () => {
      await router.push("/user/room");
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

  const onSubmit: SubmitHandler<IRequestChangeRoomFormPage> = async (data) => {
    const { roomType, reason } = data;
    setLoading(true);
    const accountId = sessionStorage.getItem("accountId");
    if (accountId) {
      requestChangeRoomMutation.mutateAsync({ accountId, roomType, reason });
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
      <PageHead title="Yêu cầu chuyển Phòng | SGU domitory" />
      <RequestChangeRoom
        form={
          <RequestChangeRoomFormCreate
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
            roomTypes={roomTypeQuery.data}
            isLoadingRoomTypes={roomTypeQuery.isLoading}
          />
        }
      />
    </>
  );
};

RequestChangeRoomPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default RequestChangeRoomPage;
