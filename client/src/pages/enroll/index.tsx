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
import adminPriorityAPI from "@/api/admin/priority";

export interface IEnrollParams {
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  roomTypeId: string;
  priority: string;
  province: string;
  district: string;
  street: string;
  images: File[];
}

const erollSchema = yup.object({
  firstName: yup.string().required("Vui lòng điền tên"),
  lastName: yup.string().required("Vui lòng điền họ"),
  studentId: yup.string().required("Vui lòng điền mã số viên"),
  email: yup.string().required("Vui lòng điền email"),
  phone: yup.string().required("Vui lòng điền số điện thoại"),

  province: yup.string().required("Vui lòng điền tỉnh"),
  district: yup.string().required("Vui lòng điền quận"),
  street: yup.string().required("Vui lòng điền đường"),
  dateOfBirth: yup.string().required("Vui lòng chọn ngày sinh"),
  roomTypeId: yup.string().required("Vui lòng chọn loại phòng"),
});

const EnrollPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue, getValues } = useForm<IEnrollParams>(
    {
      resolver: yupResolver(erollSchema),
      defaultValues: {
        roomTypeId: "",
        priority: "",
      },
    }
  );

  const roomTypeQuery = useQuery({
    queryKey: ["room-type-detail"],
    queryFn: () => roomTypeAPI.getListOfRoom(),
    onSuccess: (data) => {
      const searchUrl = router.query;
      const roomTypeId = searchUrl["room-type"] as string | undefined;

      if (roomTypeId) {
        const index = data.map((item) => item._id).indexOf(roomTypeId);
        setValue("roomTypeId", data[index]._id);
      }
    },
    enabled: router.isReady,
  });

  const priorityQuery = useQuery({
    queryKey: ["priority-detail"],
    queryFn: () => adminPriorityAPI.getList(),
  });

  const enrollMutation = useMutation({
    mutationKey: ["enroll"],
    mutationFn: ({
      firstName,
      lastName,
      studentId,
      email,
      phone,
      dateOfBirth,
      priority,
      province,
      district,
      street,
    }: IEnrollParams) => {
      setLoading(true);
      return bookingRequestAPI.create(
        firstName,
        lastName,
        studentId,
        email,
        phone,
        dateOfBirth,
        priority,
        province,
        district,
        street
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
    // enrollMutation.mutate({ ...data });
    console.log(data);
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
        priorityList={priorityQuery.data}
        isLoadingPriority={priorityQuery.isLoading}
      />
    </>
  );
};

EnrollPage.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default EnrollPage;
