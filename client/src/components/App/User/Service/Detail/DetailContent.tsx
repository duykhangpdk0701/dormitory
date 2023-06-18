import React, { FC } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import product1 from "@/assets/images/products/product_1.jpg";
import product2 from "@/assets/images/products/product_2.jpg";
import product3 from "@/assets/images/products/product_3.jpg";
import product4 from "@/assets/images/products/product_4.jpg";
import IService from "@/interfaces/Service";
import priceFormat from "@/utils/formatPrice";
import Link from "next/link";

interface IServiceDetailContent {
  data?: IService;
}

const ServiceDetailContent: FC<IServiceDetailContent> = (props) => {
  const { data } = props;
  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className="p-6">
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Swiper
                    className="h-[400px] w-full"
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay
                  >
                    <SwiperSlide>
                      <LazyLoadImage
                        className="w-full object-cover h-full"
                        src={product1.src}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <LazyLoadImage
                        className="w-full object-cover h-full"
                        src={product2.src}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <LazyLoadImage
                        className="w-full object-cover h-full"
                        src={product3.src}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <LazyLoadImage
                        className="w-full object-cover h-full"
                        src={product4.src}
                      />
                    </SwiperSlide>
                  </Swiper>
                </Grid>

                <Grid item xs={12}>
                  {data?.description && (
                    <div
                      dangerouslySetInnerHTML={{ __html: data?.description }}
                    />
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="p-6 mb-6">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div className="mb-4">
                    <span className="font-bold text-base mr-2">
                      Tên dịch vụ:{" "}
                    </span>{" "}
                    <span className="text-base">{data?.name} </span>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-base mr-2">Giá:</span>{" "}
                    <span className="text-base">
                      {data?.price && priceFormat(data?.price)}{" "}
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Paper>

            <Button
              LinkComponent={Link}
              href={`/user/service/enroll/${data?._id}`}
              variant="contained"
              fullWidth
            >
              Đăng ký
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ServiceDetailContent;
