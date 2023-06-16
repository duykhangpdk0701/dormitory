import adminJobAPI from "@/api/admin/job";
import adminStaffAPI from "@/api/admin/staff";
import StaffCreate from "@/components/App/Admin/Staff/Create";
import StaffFormCreate from "@/components/App/Admin/Staff/Create/Form";
import StaffUpdate from "@/components/App/Admin/Staff/Edit";
import StaffFormUpdate from "@/components/App/Admin/Staff/Edit/Form";
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

export interface IStaffUpdateFormParams {
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

export interface IStaffUpdateParams {
  id: string;
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

const staffUpdateSchema = yup.object({
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

const StaffUpdatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue } = useForm<IStaffUpdateFormParams>({
    resolver: yupResolver(staffUpdateSchema),
  });
  const jobListQuery = useQuery({
    queryKey: ["job"],
    queryFn: () => adminJobAPI.getList(),
  });

  const jobDetailQuery = useQuery({
    queryKey: ["job", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminStaffAPI.getById(id);
      }
    },
    onSuccess(data) {
      data?.dateStart && setValue("dateStart", new Date(data.dateStart));
      data?.address.street && setValue("street", data.address.street);
      data?.address.province && setValue("province", data.address.province);
      data?.address.district && setValue("district", data.address.district);
      data?.salary && setValue("salary", data.salary);
      data?.account.firstname && setValue("firstname", data.account.firstname);
      data?.account.lastname && setValue("lastname", data.account.lastname);
      data?.account.dateOfBirth &&
        setValue("dateOfBirth", new Date(data.account.dateOfBirth));
      data?.account.email && setValue("email", data.account.email);
      data?.job && setValue("job", data.job.name);
      data?.account.phone && setValue("phone", data.account.phone);
    },
  });

  const onSubmit: SubmitHandler<IStaffUpdateFormParams> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <PageHead title="Danh sách nhân viên ký túc xá | SGU domitory" />
      <StaffUpdate
        form={
          <StaffFormUpdate
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

StaffUpdatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default StaffUpdatePage;
