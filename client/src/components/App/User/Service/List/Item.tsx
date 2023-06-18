import React, { FC } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import cover from "@/assets/images/covers/cover_3.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import moment from "moment";
import IService from "@/interfaces/Service";

interface IServiceItem {
  data: IService;
}

const ServiceItem: FC<IServiceItem> = (props) => {
  const { data } = props;

  return (
    <Card className="overflow-hidden relative">
      <Link href={`/user/service/${data._id}`}>
        <CardContent className="absolute bottom-10 px-6 pb-6 z-10 w-full">
          <Typography variant="caption" className="text-gray-300">
            {moment(data.createdAt).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="h5" className="text-white text-base">
            {data.name}
          </Typography>
        </CardContent>
        <div className="top-0 w-full h-full absolute bg-black/60 z-[1]"></div>
        <div className="h-[360px] leading-[1] overflow-hidden">
          <LazyLoadImage
            src={cover.src}
            alt="Yêu cầu sửa máy quạt"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="flex justify-end absolute z-20 right-5 bottom-5">
        <Button
          LinkComponent={Link}
          href={`/user/service/enroll/${data._id}`}
          variant="contained"
          className="hover:opacity-100"
        >
          Đăng ký
        </Button>
      </div>
    </Card>
  );
};

export default ServiceItem;
