import IRoom from "@/interfaces/Room";
import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
        <Grid container rowSpacing={1}>
          <Grid item xs={12} md={6}>
            <div>
              <span className="text-base font-bold">Tên</span>:{" "}
              <span className="text-base">{data?.name}</span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div>
              <span className="text-base font-bold">Tầng</span>:{" "}
              <span className="text-base">{data?.floor}</span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div>
              <span className="text-base font-bold">Giường</span>:{" "}
              <span className="text-base">{data?.numberBed}</span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div>
              <span className="text-base font-bold">Sức chứa</span>:{" "}
              <span className="text-base">{data?.numberPeople}</span>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div>
              <span className="text-base font-bold ">Mô tả</span>:{" "}
              <p className="text-base block">{data?.description}</p>
            </div>
          </Grid>

          <Grid item xs={12}>
            <span className="text-base font-bold">Hình ảnh:</span>
            <Grid container spacing={3}>
              {data?.images.map((item, index) => (
                <Grid item xs={3} key={index}>
                  <LazyLoadImage
                    className="w-full object-cover"
                    src={(process.env.NEXT_PUBLIC_SERVER_URL as string) + item}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default RoomDetailContent;
