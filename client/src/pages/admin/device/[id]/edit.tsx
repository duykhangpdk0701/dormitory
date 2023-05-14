import adminDeviceAPI from "@/api/admin/device";
import adminRoomAPI from "@/api/admin/room";
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
import DeviceEdit from "@/components/App/Admin/Device/Edit";
import DeviceFormEdit from "@/components/App/Admin/Device/Edit/Form";
import moment, { Moment } from "moment";

export interface IDeviceEditParams {
  id: string;
  name: string;
  desc: string;
  roomId: string;
  dateAdd: Date;
  price: number;
}

export interface IDeviceEditFormParams {
  name: string;
  desc: string;
  roomId: string;
  dateAdd: moment.Moment;
  price: number;
}

const deviceEditSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
  roomId: yup.string().required(),
  dateAdd: yup.date().required(),
  price: yup.number().required(),
});

const DeviceEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue } = useForm<IDeviceEditFormParams>({
    resolver: yupResolver(deviceEditSchema),
  });

  const roomQuery = useQuery({
    queryKey: ["room"],
    queryFn: () => adminRoomAPI.getList(),
  });

  const deviceDetailQuery = useQuery({
    queryKey: ["device-detail"],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminDeviceAPI.getById(id);
      }
    },
    onSuccess: (data) => {
      data?.name && setValue("name", data.name);
      data?.description && setValue("desc", data.description);
      data?.roomId && setValue("roomId", "64510ee8db6970373e149a9a");
      data?.dateAdd && setValue("dateAdd", moment(data.dateAdd));
      data?.price && setValue("price", data.price);
    },
    enabled: roomQuery.isFetched,
  });

  const deviceEditMutation = useMutation({
    mutationKey: ["device"],
    mutationFn: async ({
      id,
      name,
      desc,
      roomId,
      dateAdd,
      price,
    }: IDeviceEditParams) =>
      adminDeviceAPI.update(id, name, desc, roomId, dateAdd, price),
    onSuccess: async () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thêm thiết bị thành công",
        })
      );
      await router.push("/admin/device");
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

  const onSubmit: SubmitHandler<IDeviceEditFormParams> = async (data) => {
    const { name, desc, roomId, dateAdd, price } = data;
    setLoading(true);
    if (id && typeof id !== "object") {
      await deviceEditMutation.mutateAsync({
        id,
        name,
        desc,
        roomId,
        dateAdd: moment(dateAdd).toDate(),
        price,
      });
    }
  };

  return (
    <>
      <PageHead title="Thêm thiết bị ký túc xá | SGU domitory" />
      <DeviceEdit
        form={
          <DeviceFormEdit
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

DeviceEditPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default DeviceEditPage;
