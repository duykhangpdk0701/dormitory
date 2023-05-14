import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid } from "@mui/material";
import IDevice from "@/interfaces/Device";

interface IDeviceDetailContent {
  data?: IDevice;
}

const DeviceDetailContent: FC<IDeviceDetailContent> = (props) => {
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

            <div className="mb-4">
              <span className="text-base font-bold">Thuộc phòng</span>:{" "}
              <span className="text-base">{data?.room.name}</span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Mô tả</span>:{" "}
              <span className="text-base">{data?.description}</span>
            </div>

            <div className="mb-4">
              <span className="text-base font-bold">Giá trị</span>:{" "}
              <span className="text-base">{data?.price}</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default DeviceDetailContent;
