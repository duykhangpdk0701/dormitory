import IStaff from "@/interfaces/Staff";
import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid } from "@mui/material";

interface IStaffDetailContent {
  data?: IStaff;
}

const StaffDetailContent: FC<IStaffDetailContent> = (props) => {
  const { data } = props;
  return (
    <Card>
      <CardHeader
        title={`${data?.account.lastname} ${data?.account.firstname}`}
      />
      <Divider />
      <div className="p-10">
        <Grid container rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Họ và tên</span>:{" "}
              <span className="text-base">{`${data?.account.lastname} ${data?.account.firstname}`}</span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Địa chỉ Email</span>:{" "}
              <span className="text-base">{data?.account.email}</span>
            </div>
            <div className="mb-4">
              <span className="text-base font-bold">Giới tính</span>:{" "}
              <span className="text-base">{data?.account.gender}</span>
            </div>
          </Grid>
          <span className="text-base font-bold">Hình ảnh chứng thực:</span>
        </Grid>
      </div>
    </Card>
  );
};

export default StaffDetailContent;
