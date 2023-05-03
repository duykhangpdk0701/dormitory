import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import img3 from "@/assets/home/img3.jpg";
import { Divider, Grid, Container, Button } from "@mui/material";
import img1 from "@/assets/home/img1.jpg";
import intro from "@/assets/home/intro.png";
import procedure from "@/assets/home/thu-tuc.png";
import Link from "next/link";

const Announcement = () => {
  return (
    <Container>
      <Grid container className="py-12" spacing={3}>
        <Grid item lg={9} md={9} xs={12}>
          <div>
            <h2 className="text-red-600 text-xl font-medium uppercase mb-3">
              Hoạt động phong trào
            </h2>
            <Divider className="bg-blue-800 mb-2" />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div>
                  <div className="mb-3 h-72">
                    <LazyLoadImage
                      src={img1.src}
                      className="object-contain h-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Delectus, sint?
                  </h3>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum eius, ab sed neque explicabo blanditiis tenetur
                    itaque ad perferendis iste. Possimus eaque reiciendis
                    corrupti quis nostrum rem iste laborum cum?
                  </p>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <div className="mb-3 h-72">
                    <LazyLoadImage src={img1.src} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Delectus, sint?
                  </h3>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum eius, ab sed neque explicabo blanditiis tenetur
                    itaque ad perferendis iste. Possimus eaque reiciendis
                    corrupti quis nostrum rem iste laborum cum?
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
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
        </Grid>
      </Grid>

      <div>
        <div className="py-12">
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <div>
                <LazyLoadImage
                  src={intro.src}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="my-1 mx-5">
                <h4 className="text-lg font-bold my-2">Giới thiệu chung</h4>
                <p className="mb-2.5">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ipsa, fuga nam corrupti hic distinctio nesciunt molestias
                  quis, neque perspiciatis assumenda eaque id saepe deleniti
                  voluptatum? Beatae perspiciatis ab consequatur unde!
                </p>

                <Button size="small" variant="outlined">
                  Xem thêm
                </Button>
              </div>
            </Grid>

            <Grid item xs={12} lg={5}>
              <Button
                size="large"
                className="uppercase mb-5"
                variant="contained"
                fullWidth
                LinkComponent={Link}
                href="/enroll"
              >
                Đăng Ký ký túc xá
              </Button>

              <div className="relative">
                <div>
                  <LazyLoadImage
                    src={procedure.src}
                    alt="procedure-img"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-0 left-0 p-5 w-full h-full bg-black bg-opacity-50 text-white">
                  <h4 className="text-lg text-white">Hướng dẫn làm thủ tục</h4>
                  <p className="my-2">Hướng dẫn đăng ký biểu mẫu thủ tục</p>
                  <Button variant="outlined" color="inherit">
                    Xem thêm
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default Announcement;
