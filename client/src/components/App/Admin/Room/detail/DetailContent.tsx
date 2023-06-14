import IRoom from "@/interfaces/Room";
import React, { FC } from "react";
import { Grid, Paper } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import product1 from "@/assets/images/products/product_1.jpg";
import product2 from "@/assets/images/products/product_2.jpg";
import product3 from "@/assets/images/products/product_3.jpg";
import product4 from "@/assets/images/products/product_4.jpg";
import ICivilian from "@/interfaces/Civilian";
import Link from "next/link";

interface IRoomDetailContent {
  data?: IRoom;
  civilianData?: ICivilian[];
}

const RoomDetailContent: FC<IRoomDetailContent> = (props) => {
  const { data, civilianData } = props;
  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className="p-6">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Swiper
                    className="h-[400px] w-full"
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay
                    pagination
                    navigation
                  >
                    {data?.images.map((item, index) => (
                      <SwiperSlide key={index}>
                        <LazyLoadImage
                          className="w-full object-cover h-full"
                          src={
                            (process.env.NEXT_PUBLIC_SERVER_URL as string) +
                            item
                          }
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Grid>

                <Grid item xs={12}>
                  <h2>Phòng {data?.name}</h2>
                </Grid>

                <Grid item xs={12}>
                  <div>
                    <span className="text-base font-bold ">Mô tả</span>:{" "}
                    {data?.description && (
                      <p
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="p-6 mb-6">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div>
                    <span className="text-base font-bold">Loại Phòng</span>:{" "}
                    <span className="text-base">{data?.roomType.name}</span>
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
                    <span className="text-base">
                      {data?.numberPeople} người
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Paper>

            <Paper className="p-6 mb-6">
              <div>
                <span className="text-base font-bold block">
                  Cư dân đang cư trú:
                </span>

                <div>
                  {civilianData?.map((item) => (
                    <Link href={`/admin/civilian/${item._id}`} key={item._id}>
                      <span>
                        {item.account.lastname} {item.account.lastname}
                      </span>
                      <span>{item.studentId}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </Paper>

            <Paper className="p-6">
              <div>
                <span className="text-base font-bold block">Thiết bị:</span>

                <div>
                  {civilianData?.map((item) => (
                    <Link href={`/admin/civilian/${item._id}`} key={item._id}>
                      <span>
                        {item.account.lastname} {item.account.lastname}
                      </span>
                      <span>{item.studentId}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default RoomDetailContent;
