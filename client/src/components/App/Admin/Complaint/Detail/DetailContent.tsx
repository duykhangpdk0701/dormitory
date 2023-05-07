import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid } from "@mui/material";
import IComplaint from "@/interfaces/Complaint";

interface IComplaintDetailContent {
  data?: IComplaint;
}

const ComplaintDetailContent: FC<IComplaintDetailContent> = (props) => {
  const { data } = props;
  return (
    <Card>
      <CardHeader title={`${data?.title}`} />
      <Divider />
      <div className="p-10">
        <Grid container rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Tên</span>:{" "}
              <span className="text-base">{data?.title}</span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Tên cư dân</span>:{" "}
              <span className="text-base">
                {data?.civilian.account.lastname}{" "}
                {data?.civilian.account.firstname}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-base font-bold">MSSV</span>:{" "}
              <span className="text-base">{data?.civilian.studentId}</span>
            </div>
          </Grid>
          <div>
            <span className="text-base font-bold">Nội dung</span>
            <p className="mt-3">{data?.description}</p>
          </div>
        </Grid>
      </div>
    </Card>
  );
};

export default ComplaintDetailContent;
