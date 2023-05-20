import IRoom from "@/interfaces/Room";
import React, { FC } from "react";
import { Card, CardHeader, Divider, Grid, Button } from "@mui/material";
import IRoomType from "@/interfaces/RoomTypet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import priceFormat from "@/utils/formatPrice";

interface IRoomTypeContent {
  data?: IRoomType;
}

const RoomTypeDetailContent: FC<IRoomTypeContent> = (props) => {
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
              <span className="text-base font-bold">Giá</span>:{" "}
              <span className="text-base">
                {data?.price && priceFormat(data.price)}
              </span>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Grid container className="mb-4" spacing={3}>
              {data?.images.map((item) => (
                <Grid item xs={6} lg={3} md={4}>
                  <div className="w-full h-[200px]">
                    <LazyLoadImage
                      loading="eager"
                      className="w-full h-full object-cover"
                      src={process.env.NEXT_PUBLIC_SERVER_URL + item}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div className="mb-4">
              <span className="text-base font-bold">Mô tả</span>:{" "}
              <p className="text-base">{data?.description}</p>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Button
              LinkComponent={Link}
              href={`/enroll?room-typeId=${data?._id}`}
              variant="contained"
              size="large"
              fullWidth
            >
              Đăng ký
            </Button>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default RoomTypeDetailContent;
