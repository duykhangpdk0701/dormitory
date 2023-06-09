import React, { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import cover from "@/assets/images/covers/cover_3.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import IComplaint from "@/interfaces/Complaint";
import moment from "moment";

interface IComplaintItem {
  data: IComplaint;
}

const ComplaintItem: FC<IComplaintItem> = (props) => {
  const { data } = props;
  return (
    <Card className="overflow-hidden  relative">
      <CardContent className="absolute bottom-0 px-6 pb-6 z-10 w-full">
        <Typography variant="caption" className="text-gray-300">
          {moment(data.createdAt).format("DD MM YYYY")}
        </Typography>
        <Link href="#">
          <Typography variant="h5" className="text-white text-base">
            {data.name}
          </Typography>
        </Link>
        <div className="mt-6 flex justify-end">
          <div className="text-white">Đã xem</div>
        </div>
      </CardContent>
      <div className="top-0 w-full h-full absolute bg-black/60 z-[1]"></div>
      <div className="h-[360px] leading-[1] overflow-hidden">
        <LazyLoadImage
          src={cover.src}
          alt="Yêu cầu sửa máy quạt"
          className="w-full h-full object-cover"
        />
      </div>
    </Card>
  );
};

export default ComplaintItem;
