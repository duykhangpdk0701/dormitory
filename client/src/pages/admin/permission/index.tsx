import adminPermission from "@/api/admin/permission";
import Permission from "@/components/App/Admin/Permission/List";
import PermissionTable from "@/components/App/Admin/Permission/List/PermissionTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";

import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import queryString from "query-string";

export interface IPermissionParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const PermissionPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IPermissionParams>({
    defaultValues: {
      page: 1,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IPermissionParams> = (data) => {
    console.log(data);
  };

  const permissionQuery = useQuery({
    queryKey: ["permission", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminPermission.getList(search, limit || 5, page || 1);
      }
      return undefined;
    },
  });

  useEffect(() => {
    watch(async (value) => {
      const stringUrl = queryString.stringify(value);
      await router.push(
        { query: queryString.parse(stringUrl) as any },
        undefined,
        {
          shallow: true,
        }
      );
    });
  }, []);

  return (
    <>
      <PageHead title="Danh sách quyền | SGU domitory" />
      <Permission
        table={
          <PermissionTable
            data={permissionQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={permissionQuery.isLoading}
          />
        }
      />
    </>
  );
};

PermissionPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PermissionPage;
