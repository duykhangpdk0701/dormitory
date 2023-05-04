import IRoom from "@/interfaces/Room";
import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid } from "@mui/material";

interface IRoomDetailContent {
  data?: IRoom;
}

const RoomDetailContent: FC<IRoomDetailContent> = (props) => {
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
          <span className="text-base font-bold">Hình ảnh:</span>
        </Grid>
      </div>
    </Card>
  );
};

export default RoomDetailContent;
