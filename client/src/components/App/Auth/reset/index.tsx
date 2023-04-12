//mui component
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import logo from "@/assets/logo.png";

const ResetPasswordTemplate = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="flex justify-center items-center bg-[#F6F9FC] min-h-screen">
      <Paper
        className="w-full sm:w-[500px] py-8 px-12"
        sx={{ boxShadow: "0px 8px 45px rgb(3 0 71 / 9%)" }}
      >
        <Box component="form">
          <Image
            src={logo}
            alt="DBRR logo"
            className="mx-auto block"
            width={70}
            height={70}
          />
          <h1 className="mb-8 mt-2 text-[16px] font-bold text-center">
            Reset your password
          </h1>
          <Box className="mb-3">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput
                    {...field}
                    // className="py-2 px-3.5"
                    placeholder="abd@gmail.com"
                    fullWidth
                  />
                </>
              )}
            />
          </Box>

          <Button
            variant="contained"
            fullWidth
            disableElevation
            className="font-semibold"
          >
            Reset
          </Button>
        </Box>

        <Box className="mt-5 flex justify-center text-sm">
          <span>Don't have a account?</span>
          <Link href="/auth/register" className="ml-2">
            Sign up
          </Link>
        </Box>
      </Paper>
    </div>
  );
};

export default ResetPasswordTemplate;
