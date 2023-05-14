import React, { FC } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import cover from "@/assets/images/covers/cover_3.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import IRoomType from "@/interfaces/RoomTypet";

interface IRoomTypeItem {
  data: IRoomType;
}

const RoomTypeItem: FC<IRoomTypeItem> = (props) => {
  const { data } = props;
  return (
    <Link href={`/room-type/${data._id}`}>
      <Card className="overflow-hidden  relative">
        <CardContent className="absolute bottom-0 px-6 pb-6 z-10 w-full">
          <Typography variant="h5" className="text-white text-base">
            {data.name}
          </Typography>
          <Typography variant="caption" className="text-gray-300">
            {data.price}
          </Typography>
          <div className="mt-6 flex justify-end">
            <Button
              variant="contained"
              size="small"
              LinkComponent={Link}
              href={`/enroll?room-type=${data._id}`}
            >
              Đăng ký
            </Button>
          </div>
        </CardContent>
        <div className="top-0 w-full h-full absolute bg-black/40 z-[1]"></div>
        <div className="h-[360px] leading-[1] overflow-hidden">
          <LazyLoadImage
            src={process.env.NEXT_PUBLIC_SERVER_URL + data.images[0]}
            alt="Yêu cầu sửa máy quạt"
            className="w-full h-full object-cover hover:scale-50"
          />
        </div>
      </Card>
    </Link>
  );
};

export default RoomTypeItem;
