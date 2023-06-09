import authAPI from "@/api/authAPI";
import Login from "@/components/App/Auth/login";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { NextPageWithLayout } from "@/pages/_app";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import PageHead from "@/components/PageHead";

export interface ILoginParams {
  username: string;
  password: string;
}

const loginSchema = yup
  .object({
    username: yup.string().required("Vui lòng nhập tên đăng nhập!"),
    password: yup.string().required("Vui lòng nhập mật khẩu!"),
  })
  .required();

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginParams>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ username, password }: ILoginParams) => {
      setLoading(true);

      return authAPI.login(username, password);
    },
    onSuccess: async (data) => {
      sessionStorage.setItem("token", data.accessToken);
      sessionStorage.setItem("username", data.user.username);
      sessionStorage.setItem("role", data.user.permission.name);
      sessionStorage.setItem("accountId", data.user.infor.accountId);
      sessionStorage.setItem("id", data.user.infor._id);
      sessionStorage.setItem("avatar", data.user.avatar);

      if (data.user.permission.name === "admin") {
        await router.push("/admin");
      } else if (data.user.permission.name === "staff") {
        await router.push("/staff/task");
      } else if (data.user.permission.name === "civilian") {
        await router.push("/user/room");
      } else {
        await router.push("/");
      }
      setLoading(false);
    },
    onError: (error: any) => {
      setError(error.messages);
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<ILoginParams> = (data) => {
    const { username, password } = data;
    loginMutation.mutate({ username, password });
  };

  return (
    <>
      <PageHead title="Đăng nhập | SGU domitory" />
      <Login
        errorResMessage={error}
        isLoading={loading}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </>
  );
};

export default LoginPage;
