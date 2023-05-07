import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid } from "@mui/material";
import IService from "@/interfaces/Service";

interface IServiceDetailContent {
  data?: IService;
}

const ServiceDetailContent: FC<IServiceDetailContent> = (props) => {
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

          <Grid item xs={12} md={6}></Grid>
          <div>
            <span className="text-base font-bold">Mô tả:</span>
            <p className="mt-3">{data?.description}</p>
          </div>
        </Grid>
      </div>
    </Card>
  );
};

export default ServiceDetailContent;
