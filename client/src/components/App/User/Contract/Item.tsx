import React, { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import cover from "@/assets/images/covers/cover_3.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import IContract from "@/interfaces/Contract";
import moment from "moment";

interface IContractItem {
  data: IContract;
}

const ContractItem: FC<IContractItem> = (props) => {
  const { data } = props;
  return (
    <Card className="overflow-hidden  relative">
      <CardContent className="absolute bottom-0 px-6 pb-6 z-10 w-full">
        <Typography variant="caption" className="text-gray-300">
          {moment(data.createdAt).format("DD M YYYY")}
        </Typography>
        <Typography variant="h5" className="text-white text-base">
          Hợp đồng cư trú
        </Typography>
        <div className="mt-6 flex justify-end">
          <div className="text-white">Đã duyệt</div>
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

export default ContractItem;
