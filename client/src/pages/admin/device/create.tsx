import adminDeviceAPI from "@/api/admin/device";
import adminRoomAPI from "@/api/admin/room";
import DeviceCreate from "@/components/App/Admin/Device/Create";
import DeviceFormCreate from "@/components/App/Admin/Device/Create/Form";
import PageHead from "@/components/PageHead";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface IDeviceCreateParams {
  name: string;
  desc: string;
  roomId: string;
  dateAdd: Date;
  price: number;
}

const deviceCreateSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
  roomId: yup.string().required(),
  dateAdd: yup.date().required(),
  price: yup.number().required(),
});

const DevicePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roomQuery = useQuery({
    queryKey: ["room"],
    queryFn: () => adminRoomAPI.getList(),
  });

  const jobCreateMutation = useMutation({
    mutationKey: ["device"],
    mutationFn: async ({
      name,
      desc,
      roomId,
      dateAdd,
      price,
    }: IDeviceCreateParams) =>
      adminDeviceAPI.create(name, desc, roomId, dateAdd, price),
    onSuccess: async () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Tạo công việc thành công",
        })
      );
      await router.push("/admin/job");
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

  const { control, handleSubmit } = useForm<IDeviceCreateParams>({
    resolver: yupResolver(deviceCreateSchema),
  });

  const onSubmit: SubmitHandler<IDeviceCreateParams> = async (data) => {
    const { name, desc, roomId, dateAdd, price } = data;
    setLoading(true);
    await jobCreateMutation.mutateAsync({ name, desc, roomId, dateAdd, price });
  };

  return (
    <>
      <PageHead title="Thêm thiết bị ký túc xá | SGU domitory" />
      <DeviceCreate
        form={
          <DeviceFormCreate
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
            room={roomQuery.data}
            isLoadingRoom={roomQuery.isLoading}
          />
        }
      />
    </>
  );
};

DevicePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default DevicePage;
