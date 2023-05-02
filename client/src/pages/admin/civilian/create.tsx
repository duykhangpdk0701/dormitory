import CivilianCreate from "@/components/App/Admin/Civilian/Create";
import CivilianFormCreate from "@/components/App/Admin/Civilian/Create/Form";
import PageHead from "@/components/PageHead";
import { useAppDispatch } from "@/hooks/redux";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface ICreateCivilianParams {
  dateStart: Date;
  accountId: string;
  street: string;
  district: string;
  province: string;
  studentId: string;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
}

const createCivilianSchema = yup.object({
  dateStart: yup.date().required(),
  accountId: yup.string().required(),
  street: yup.string().required(),
  district: yup.string().required(),
  province: yup.string().required(),
  studentId: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  dateOfBirth: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().length(10).required(),
});

const CivilianCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit } = useForm<ICreateCivilianParams>({
    resolver: yupResolver(createCivilianSchema),
  });

  const onSubmit: SubmitHandler<ICreateCivilianParams> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <PageHead title="Thêm cư dân ký túc xá | SGU domitory" />
      <CivilianCreate
        form={
          <CivilianFormCreate
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
          />
        }
      />
    </>
  );
};

CivilianCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default CivilianCreatePage;
