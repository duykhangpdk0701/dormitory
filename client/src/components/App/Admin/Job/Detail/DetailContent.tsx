import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid } from "@mui/material";
import IJob from "@/interfaces/Job";

interface IJobDetailContent {
  data?: IJob;
}

const JobDetailContent: FC<IJobDetailContent> = (props) => {
  const { data } = props;
  return (
    <Card>
      <CardHeader title={`${data?.name}`} />
      <Divider />
      <div className="p-10">
        <Grid container rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Tên</span>:{" "}
              <span className="text-base">{data?.name}</span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Mô tả</span>:{" "}
              <span className="text-base">{data?.description}</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default JobDetailContent;
