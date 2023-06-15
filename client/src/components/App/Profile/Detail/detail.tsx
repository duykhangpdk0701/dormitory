import ILogin from "@/interfaces/Login";
import { Box, Grid, Paper, Typography, Avatar } from "@mui/material";
import React, { FC } from "react";

interface IProfileDetailDetail {
  data?: ILogin;
}

const ProfileDetailDetail: FC<IProfileDetailDetail> = (props) => {
  const { data } = props;
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className="py-20">
            <div>
              <Box
                className="mb-10 flex justify-center items-center w-44 h-44 mx-auto rounded-full relative"
                sx={{ border: "1px dashed rgba(145, 158, 171, 0.32)" }}
                component="label"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={
                    (process.env.NEXT_PUBLIC_SERVER_URL as string) +
                    data?.user.avatar
                  }
                  className="w-full h-full"
                />
              </Box>
            </div>
            <h3 className="text-center text-xl">
              {data?.user.lastname} {data?.user.firstname}
            </h3>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className="p-6">
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <span className="text-base font-bold">Tên:</span>{" "}
                <span className="text-base">{data?.user.firstname}</span>
              </Grid>
              <Grid item xs={12} md={6}>
                <span className="text-base font-bold">Họ:</span>{" "}
                <span className="text-base">{data?.user.lastname}</span>
              </Grid>
              <Grid item xs={12} md={6}>
                <span className="text-base font-bold">Email:</span>{" "}
                <span className="text-base">{data?.user.email}</span>
              </Grid>
              <Grid item xs={12} md={6}>
                <span className="text-base font-bold">Số điện thoại:</span>{" "}
                <span className="text-base">{data?.user.phone}</span>
              </Grid>
              <Grid item xs={12} md={6}>
                <span className="text-base font-bold">Quyền:</span>{" "}
                <span className="text-base">{data?.user.permission.name}</span>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileDetailDetail;
