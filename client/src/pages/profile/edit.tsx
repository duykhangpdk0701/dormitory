import React, { ChangeEvent, ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHead from "@/components/PageHead";
import ProfileEdit from "@/components/App/Profile/Edit";
import ProfileEditForm from "@/components/App/Profile/Edit/form";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import avatar from "@/assets/images/avatars/avatar_1.jpg";

export interface IUpdateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

const updateBrandSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  role: yup.string().required(),
});

const EditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<string>(avatar.src);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdateUserParams>({ resolver: yupResolver(updateBrandSchema) });

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const fileLoader = URL.createObjectURL(files[0]);
      setFile(fileLoader);
    }
  };

  const onSubmit: SubmitHandler<IUpdateUserParams> = (data) => {
    console.log(data);
  };

  return (
    <>
      <PageHead title="Chỉnh sửa trang cá nhân | SGU dormitory" />
      <ProfileEdit
        form={
          <ProfileEditForm
            handleSelectFile={handleSelectFile}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isLoading={loading}
            errorResMessage={error}
            file={file}
          />
        }
      />
    </>
  );
};

EditPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default EditPage;
