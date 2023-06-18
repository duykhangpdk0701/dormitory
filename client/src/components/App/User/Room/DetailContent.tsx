import IRoom from "@/interfaces/Room";
import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid } from "@mui/material";

interface IRoomViewContent {
  data?: IRoom;
}

const RoomViewContent: FC<IRoomViewContent> = (props) => {
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
              <span className="text-base font-bold">Mô tả</span>:{" "}
              {data?.description && (
                <p dangerouslySetInnerHTML={{ __html: data.description }} />
              )}
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Giường</span>:{" "}
              <span className="text-base">{data?.numberBed}</span>
            </div>

            <div className="mb-4">
              <span className="text-base font-bold">Cư dân</span>:{" "}
              <span className="text-base">{data?.numberPeople}</span>
            </div>

            <div className="mb-4">
              <span className="text-base font-bold">Giá</span>:{" "}
              <span className="text-base">{data?.price}</span>
            </div>

            <div className="mb-4">
              <span className="text-base font-bold">Diện tích</span>:{" "}
              <span className="text-base">{data?.area}m2</span>
            </div>
          </Grid>
          <span className="text-base font-bold">Hình ảnh:</span>
        </Grid>
      </div>
    </Card>
  );
};

export default RoomViewContent;
