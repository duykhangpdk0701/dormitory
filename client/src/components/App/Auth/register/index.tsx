import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoadingButton from "@mui/lab/LoadingButton";
//mui Component
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//next
import Image from "next/image";
import Link from "next/link";
import React, { useState, FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { IRegisterParams } from "@/pages/auth/register";
import logo from "@/assets/logo.png";

interface IRegisterTemplate {
  control: Control<IRegisterParams, any>;
  handleSubmit: UseFormHandleSubmit<IRegisterParams>;
  onSubmit: SubmitHandler<IRegisterParams>;
  errors: FieldErrors<IRegisterParams>;
  isLoading: boolean;
  errorResMessage: string;
}

const RegisterTemplate: FC<IRegisterTemplate> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    errorResMessage,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex justify-center items-center bg-[#F6F9FC] min-h-screen p-10">
      <Paper
        className="w-full sm:w-[500px] py-8 px-12"
        sx={{ boxShadow: "0px 8px 45px rgb(3 0 71 / 9%)" }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Image
            src={logo}
            alt="DBRR logo"
            className="mx-auto block"
            width={70}
            height={70}
          />
          <h1 className="mb-8 mt-2 text-[16px] font-bold text-center">
            Create Your Account
          </h1>
          {errorResMessage && (
            <Box className="mb-3">
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorResMessage}
              </Alert>
            </Box>
          )}

          <Box className="mb-3">
            <Grid spacing={3} container>
              <Grid item xs={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel error={errors.firstName ? true : false}>
                        First name
                      </InputLabel>
                      <OutlinedInput
                        error={errors.firstName ? true : false}
                        {...field}
                        placeholder=" Richard"
                        fullWidth
                      />

                      <FormHelperText error={errors.firstName ? true : false}>
                        {errors.firstName?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel error={errors.lastName ? true : false}>
                        Last name
                      </InputLabel>
                      <OutlinedInput
                        {...field}
                        error={errors.lastName ? true : false}
                        placeholder="Richard"
                        fullWidth
                      />

                      <FormHelperText error={errors.lastName ? true : false}>
                        {errors.lastName?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          <Box className="mb-3">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel error={errors.email ? true : false}>
                    Email
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    error={errors.email ? true : false}
                    placeholder="abd@gmail.com"
                    fullWidth
                  />
                  <FormHelperText error={errors.email ? true : false}>
                    {errors.email?.message}
                  </FormHelperText>
                </>
              )}
            />
          </Box>

          <Box className="mb-3">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel error={errors.password ? true : false}>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    placeholder="**********"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    error={errors.password ? true : false}
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
                  <FormHelperText error={errors.password ? true : false}>
                    {errors.password?.message}
                  </FormHelperText>
                </>
              )}
            />
          </Box>

          <Box className="mb-3">
            <Controller
              name="passwordConfirmation"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel
                    error={errors.passwordConfirmation ? true : false}
                  >
                    Retype Password
                  </InputLabel>
                  <OutlinedInput
                    error={errors.passwordConfirmation ? true : false}
                    {...field}
                    placeholder="**********"
                    fullWidth
                    type={showConfirmPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword((show) => !show)
                          }
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon className="text-[#C0C3C8]" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText
                    error={errors.passwordConfirmation ? true : false}
                  >
                    {errors.passwordConfirmation?.message}
                  </FormHelperText>
                </>
              )}
            />
          </Box>
          <Box className="mb-3 text-end">
            <Controller
              name="agreeCkb"
              control={control}
              render={({ field }) => (
                <>
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Agree term"
                  />
                </>
              )}
            />
          </Box>
          <LoadingButton
            variant="contained"
            fullWidth
            disableElevation
            className="font-semibold"
            type="submit"
            size="large"
            loading={isLoading}
          >
            Create account
          </LoadingButton>
        </Box>
        <Box className="py-6">
          <Divider className="text-[#7D879C] text-sm w-52 mx-auto">or</Divider>
        </Box>
        <Box className="mt-5 flex justify-center text-sm">
          <span>Already have an account?</span>
          <Link href="/auth/login" className="ml-2">
            Login
          </Link>
        </Box>
      </Paper>
    </div>
  );
};

export default RegisterTemplate;
