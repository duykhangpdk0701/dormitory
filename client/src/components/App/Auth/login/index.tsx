import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
//mui component
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
//nextjs
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { ILoginParams } from "@/pages/auth/login";
import logo from "@/assets/logo.png";

interface ILogin {
  control: Control<ILoginParams, any>;
  handleSubmit: UseFormHandleSubmit<ILoginParams>;
  onSubmit: SubmitHandler<ILoginParams>;
  errors: FieldErrors<ILoginParams>;
  isLoading: boolean;
  errorResMessage: string;
}

const Login: FC<ILogin> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    errorResMessage,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center bg-[#F6F9FC] min-h-screen">
      <Paper
        className="w-full sm:w-[500px] py-8 px-12"
        sx={{ boxShadow: "0px 8px 45px rgb(3 0 71 / 9%)" }}
      >
        <Box>
          <Image
            src={logo}
            alt="DBRR logo"
            className="mx-auto block"
            width={70}
            height={70}
          />
          <h1 className="mb-8 mt-1 text-xl font-bold text-center">
            Chào mừng bạn đến với ký túc xá
            <br />
            Đại Học Sài Gòn
          </h1>
          {errorResMessage && (
            <Box className="mb-3">
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorResMessage}
              </Alert>
            </Box>
          )}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box className="mb-3">
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <InputLabel error={invalid} className="font-semibold">
                      Tên đăng nhập
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      placeholder="abcd1234"
                      fullWidth
                      error={invalid}
                    />
                    <FormHelperText error={invalid}>
                      {error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </Box>
            <Box className="mb-14">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <InputLabel error={invalid} className="font-semibold">
                      Mật khẩu
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      placeholder="**********"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      error={invalid}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon className="text-[#C0C3C8]" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText error={invalid}>
                      {error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </Box>
            <LoadingButton
              variant="contained"
              fullWidth
              disableElevation
              className="font-semibold"
              size="large"
              type="submit"
              loading={isLoading}
            >
              Đăng nhập
            </LoadingButton>
          </Box>
        </Box>
        <Box className="py-6">
          <Divider className="text-[#7D879C] text-sm w-52 mx-auto">
            Hoặc
          </Divider>
        </Box>

        <Box className="mt-5 bg-[#F3F5F9] py-5 flex justify-center text-sm">
          <span> Quên mật khẩu?</span>
          <Link
            href="/auth/reset-password"
            className="ml-2 underline text-blue-500 hover:opacity-70"
          >
            Đặt lại mật khẩu
          </Link>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;
