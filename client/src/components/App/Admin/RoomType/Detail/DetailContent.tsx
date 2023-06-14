import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid, Skeleton } from "@mui/material";
import IRoomType from "@/interfaces/RoomTypet";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface IRoomTypeDetailContent {
  data?: IRoomType;
  isLoading: boolean;
}

const RoomTypeDetailContentLoading = () => {
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12} md={6}>
        <div className="mb flex">
          <Skeleton variant="text" className="text-base w-10 mr-2" />
          <Skeleton variant="text" className="text-base w-40" />
        </div>
      </Grid>

      <Grid item xs={12} md={6}></Grid>
      <Grid item xs={12}>
        <div className="mb w-full">
          <Skeleton variant="text" className="text-base w-10 mb-2" />
          <Skeleton variant="text" className="text-base" />
          <Skeleton variant="text" className="text-base w-2/4" />
          <Skeleton variant="text" className="text-base w-3/4" />
          <Skeleton variant="text" className="text-base w-1/4" />
          <Skeleton variant="text" className="text-base w-4/4" />
        </div>
      </Grid>
    </Grid>
  );
};

const RoomTypeDetailContent: FC<IRoomTypeDetailContent> = (props) => {
  const { data, isLoading } = props;
  return (
    <Card>
      <CardHeader title={`${data?.name}`} />
      <Divider />
      <div className="p-10">
        {isLoading ? (
          <RoomTypeDetailContentLoading />
        ) : (
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <div className="mb-4">
                <span className="text-base font-bold">Tên</span>:{" "}
                <span className="text-base">{data?.name}</span>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                {data?.images.map((item, index) => (
                  <Grid item xs={3} key={index}>
                    <LazyLoadImage
                      className="w-full object-cover"
                      src={process.env.NEXT_PUBLIC_SERVER_URL + item}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}></Grid>
            <div>
              <span className="text-base font-bold">Mô tả:</span>
              <p className="mt-3">{data?.description}</p>
            </div>
          </Grid>
        )}
      </div>
    </Card>
  );
};

export default RoomTypeDetailContent;
