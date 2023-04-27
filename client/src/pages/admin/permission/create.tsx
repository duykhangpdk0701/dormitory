import AddPermission from "@/components/App/Admin/Permission/Add";
import PermissionForm from "@/components/App/Admin/Permission/Add/Form";
import Permission from "@/components/App/Admin/Permission/List";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export interface ICreatePermissionParams {
  name: string;
  desc: string;
}

const createPermissionSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
});

const PermissionCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit } = useForm<ICreatePermissionParams>({
    resolver: yupResolver(createPermissionSchema),
  });

  const onSubmit: SubmitHandler<ICreatePermissionParams> = (data) => {
    console.log(data);
  };

  return (
    <>
      <PageHead title="Tạo quyền mới | SGU domitory" />
      <AddPermission
        form={
          <PermissionForm
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

PermissionCreatePage.getLayout = function getLayout(page: ReactNode) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PermissionCreatePage;
