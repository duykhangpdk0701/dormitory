import React from "react";
import { Grid, Button } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import intro from "@/assets/home/intro.png";
import procedure from "@/assets/home/thu-tuc.png";
import Link from "next/link";

const Enroll = () => {
  return (
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa,
                fuga nam corrupti hic distinctio nesciunt molestias quis, neque
                perspiciatis assumenda eaque id saepe deleniti voluptatum?
                Beatae perspiciatis ab consequatur unde!
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
  );
};

export default Enroll;
