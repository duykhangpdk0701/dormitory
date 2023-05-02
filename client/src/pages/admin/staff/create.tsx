import adminJobAPI from "@/api/admin/job";
import StaffCreate from "@/components/App/Admin/Staff/Create";
import StaffFormCreate from "@/components/App/Admin/Staff/Create/Form";
import PageHead from "@/components/PageHead";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import * as yup from "yup";

export interface IStaffCreateParams {
  dateStart: Date;
  street: string;
  district: string;
  province: string;
  salary: number;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  job: string;
}

const staffCreateSchema = yup.object({
  dateStart: yup.string().required(),
  street: yup.string().required(),
  district: yup.string().required(),
  province: yup.string().required(),
  salary: yup.number().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  dateOfBirth: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().length(10).required(),
  job: yup.string().required(),
});

const StaffCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jobListQuery = useQuery({
    queryKey: ["job"],
    queryFn: () => adminJobAPI.getList(),
  });

  const { control, handleSubmit } = useForm<IStaffCreateParams>({
    resolver: yupResolver(staffCreateSchema),
  });

  const onSubmit: SubmitHandler<IStaffCreateParams> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <PageHead title="Danh sách nhân viên ký túc xá | SGU domitory" />
      <StaffCreate
        form={
          <StaffFormCreate
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
            job={jobListQuery.data}
            isLoadingJob={jobListQuery.isLoading}
          />
        }
      />
    </>
  );
};

StaffCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default StaffCreatePage;
