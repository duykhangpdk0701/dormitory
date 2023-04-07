import React from "react";
import { Divider } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import img3 from "@/assets/home/img3.jpg";

const Announcement = () => {
  return (
    <div>
      <h2 className="text-red-600 text-xl font-medium uppercase mb-3">
        Thông báo
      </h2>
      <Divider className="bg-blue-800 mb-2" />
      <div className="flex flex-col gap-2">
        <div className="flex">
          <div className="h-[60px] flex-[0_0_90px]">
            <LazyLoadImage
              src={img3.src}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-2">
            <span className="font-bold text-md">
              Thông báo hoàn trả phí chấm dứt hợp 15/03/2023
            </span>
          </div>
        </div>

        <div className="flex">
          <div className="h-[60px] flex-[0_0_90px]">
            <LazyLoadImage
              src={img3.src}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-2">
            <span className="font-bold text-md">
              Thông báo hoàn trả phí chấm dứt hợp 15/03/2023
            </span>
          </div>
        </div>

        <div className="flex">
          <div className="h-[60px] flex-[0_0_90px]">
            <LazyLoadImage
              src={img3.src}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-2">
            <span className="font-bold text-md">
              Thông báo hoàn trả phí chấm dứt hợp 15/03/2023
            </span>
          </div>
        </div>

        <div className="flex">
          <div className="h-[60px] flex-[0_0_90px]">
            <LazyLoadImage
              src={img3.src}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-2">
            <span className="font-bold text-md">
              Thông báo hoàn trả phí chấm dứt hợp 15/03/2023
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
