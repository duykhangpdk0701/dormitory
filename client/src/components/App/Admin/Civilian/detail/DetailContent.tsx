import ICivilian from "@/interfaces/Civilian";
import React, { FC } from "react";
import { Grid, Paper, Box, Avatar } from "@mui/material";

import avatar from "@/assets/images/avatars/avatar_1.jpg";
import Link from "next/link";

interface ICivilianDetailContent {
  data?: ICivilian;
  civilianByRoom?: ICivilian[];
}

const CivilianDetailContent: FC<ICivilianDetailContent> = (props) => {
  const { data, civilianByRoom } = props;
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
                  src={avatar.src}
                  className="w-full h-full"
                />
              </Box>
            </div>
            <h3 className="text-center text-xl">
              {data?.account.lastname} {data?.account.firstname}
            </h3>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className="p-6 mb-6">
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <span className="text-base font-bold">Tên:</span>{" "}
                <span className="text-base">{data?.account.firstname}</span>
              </Grid>
              <Grid item xs={12} md={6}>
                <span className="text-base font-bold">Họ:</span>{" "}
                <span className="text-base">{data?.account.lastname}</span>
              </Grid>
              <Grid item xs={12} md={6}>
                <span className="text-base font-bold">Email:</span>{" "}
                <Link
                  className="text-base"
                  href={`mailto:${data?.account.email}`}
                >
                  {data?.account.email}
                </Link>{" "}
              </Grid>
              <Grid item xs={12} md={6}>
                <span className="text-base font-bold">Số điện thoại:</span>{" "}
                <Link href={`tel:${data?.account.phone}`} className="text-base">
                  {data?.account.phone}
                </Link>
              </Grid>
            </Grid>
          </Paper>

          <Paper className="p-6">
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12}>
                <span className="text-base font-bold">Phòng:</span>{" "}
                <span className="text-base">{data?.room.name}</span>
              </Grid>
              <Grid item xs={12}>
                <span className="text-base font-bold">Bạn cùng phòng:</span>{" "}
                {civilianByRoom?.map((item) =>
                  item.studentId !== data?.studentId ? (
                    <Link href={`/civilian/${item._id}`}>
                      <p className="text-base">
                        {item?.account.lastname} {item?.account.firstname} -{" "}
                        {item?.studentId}
                      </p>
                    </Link>
                  ) : undefined
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CivilianDetailContent;
