import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import Enroll from "@/components/App/Enroll";
import NavLayout from "@/layouts/NavLayout";
import * as yup from "yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import bookingRequestAPI from "@/api/bookingRequest";
import PageHead from "@/components/PageHead";
import roomTypeAPI from "@/api/roomType";

export interface IEnrollParams {
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  roomTypeId: string;
  images: File[];
}

const erollSchema = yup.object({
  firstName: yup.string().required("Vui lòng điền tên"),
  lastName: yup.string().required("Vui lòng điền họ"),
  studentId: yup.string().required("Vui lòng điền mã số viên"),
  email: yup.string().required("Vui lòng điền email"),
  phone: yup.string().required("Vui lòng điền số điện thoại"),
  dateOfBirth: yup.string().required("Vui lòng chọn ngày sinh"),
  roomTypeId: yup.string().required("Vui lòng chọn loại phòng"),
});

const EnrollPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue } = useForm<IEnrollParams>({
    resolver: yupResolver(erollSchema),
  });

  const roomTypeQuery = useQuery({
    queryKey: ["room-type-detail"],
    queryFn: () => roomTypeAPI.getListOfRoom(),
    onSuccess: () => {},
  });

  useEffect(() => {
    const searchUrl = router.query;
    const roomTypeId = searchUrl.roomTypeId as string | undefined;
    console.log(roomTypeId);
    if (roomTypeId && roomTypeQuery.isFetched) {
      setValue("roomTypeId", roomTypeId);
    }
  }, [roomTypeQuery.isFetched]);

  const enrollMutation = useMutation({
    mutationKey: ["enroll"],
    mutationFn: ({
      firstName,
      lastName,
      studentId,
      email,
      phone,
      dateOfBirth,
    }: IEnrollParams) => {
      setLoading(true);
      return bookingRequestAPI.create(
        firstName,
        lastName,
        studentId,
        email,
        phone,
        dateOfBirth
      );
    },
    onSuccess: async (data) => {
      await router.push("/");
      setLoading(false);
    },
    onError: (error: any) => {
      setError(error.message);
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<IEnrollParams> = (data) => {
    enrollMutation.mutate({ ...data });
  };

  return (
    <>
      <PageHead title="Đăng ký ở ký túc xá | SGU domitory" />
      <Enroll
        control={control}
        isLoading={loading}
        errorResMessage={error}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        roomTypeList={roomTypeQuery.data}
        isLoadingRoomTypeList={roomTypeQuery.isLoading}
      />
    </>
  );
};

EnrollPage.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default EnrollPage;
