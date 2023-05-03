import React, { ReactNode, FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import banner1 from "@/assets/banner/banner1.jpg";
import { Container, Grid, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Link from "next/link";
import aboutImg from "@/assets/home/about.png";
import about2Img from "@/assets/home/about2.jpeg";
import service1Img from "@/assets/home/service/service1.png";
import service2Img from "@/assets/home/service/service2.png";
import service3Img from "@/assets/home/service/service3.png";
import service4Img from "@/assets/home/service/service4.png";
import service5Img from "@/assets/home/service/service5.png";
import service6Img from "@/assets/home/service/service6.png";
import service7Img from "@/assets/home/service/service7.png";
import service8Img from "@/assets/home/service/service8.png";
import contactImg from "@/assets/home/contact/contact.jpeg";
import entertainment from "@/assets/home/entertainment.jpg";

const Home: FC = (props) => {
  return (
    <div>
      <div className="h-[850px]  relative mb-40">
        <LazyLoadImage
          src={banner1.src}
          className="absolute left-0 top-0 object-cover h-full w-full"
        />

        <div className="absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
          <div className="bg-white/70 py-12 px-20 text-center shadow-2xl">
            <span className="uppercase font-bold">Đại học Sài Gòn</span>
            <h1 className="text-5xl text-black leading-normal whitespace-nowrap">
              Ký túc xá
              <br />
              Đại Học Sài Gòn
            </h1>
          </div>
        </div>

        <div className="absolute left-2/4 top-full -translate-y-2/4 -translate-x-2/4 max-w-[1000px] w-auto">
          <div className="bg-white p-10 ">
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} lg={3} className="flex items-center">
                <Link
                  href="#"
                  target="_blank"
                  className="hover:opacity-70 transition-opacity flex"
                >
                  <LocationOnIcon color="primary" className="mr-2" />
                  <span className="whitespace-nowrap">
                    99 Đ. An D. Vương,
                    <br />
                    Phường 16, Quận 8
                  </span>
                </Link>
              </Grid>
              <Grid item xs={12} md={6} lg={3} className="flex items-center">
                <Link
                  href="#"
                  target="_blank"
                  className="hover:opacity-70 flex"
                >
                  <LocalPhoneIcon color="primary" className="mr-2" />
                  <span>(028)38753588.</span>
                </Link>
              </Grid>
              <Grid item xs={12} md={6} lg={3} className="flex items-center">
                <Link
                  target="_blank"
                  href="#"
                  className="hover:opacity-70 flex"
                >
                  <LocationOnIcon color="primary" className="mr-2" />
                  <span>kytucxa@sgu.edu.vn</span>
                </Link>
              </Grid>
              <Grid item xs={12} md={6} lg={3} className="flex items-center">
                <Button
                  LinkComponent={Link}
                  href="/enroll"
                  variant="contained"
                  fullWidth
                  size="large"
                  className="whitespace-nowrap"
                >
                  Đăng ký
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <Container>
        <section className="mb-40">
          <LazyLoadImage
            className="w-full mb-40"
            src={aboutImg.src}
            alt="about"
          />

          <h2 className="text-center text-5xl mb-20">Về ký túc xá</h2>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <p className="text-base mb-5">
                Ký túc xá đại học là nơi lưu trú của sinh viên trong suốt thời
                gian học tập tại đại học. Đây là một không gian sống chung, nơi
                sinh viên có thể học hỏi, giao lưu và xây dựng mối quan hệ với
                nhau. Ký túc xá đại học thường được trang bị đầy đủ các tiện
                nghi như phòng tập gym, khu vực tiếp khách và các hoạt động
                ngoại khóa. Nơi đây còn giúp sinh viên tiết kiệm chi phí và tiết
                chế thời gian đi lại. Ký túc xá đại học là nơi mà sinh viên có
                thể trải nghiệm một môi trường sống thực tế, giúp họ phát triển
                kỹ năng xã hội và tạo ra mối quan hệ lâu dài với những người bạn
                cùng phòng.
              </p>
              <p className="text-base">
                Ký túc xá đại học là một phần không thể thiếu trong trải nghiệm
                học tập của sinh viên đại học. Nơi đây cung cấp cho sinh viên
                một không gian sống tiện nghi, an toàn và thân thiện. Sinh viên
                có thể tìm thấy nhiều người bạn mới và tạo ra một môi trường học
                tập đa dạng, phong phú. Ký túc xá cũng giúp sinh viên tiết kiệm
                chi phí cho việc tìm nhà trọ ngoài trường và tiết chế thời gian
                di chuyển. Ngoài ra, ký túc xá đại học còn có nhiều hoạt động và
                chương trình giúp sinh viên phát triển kỹ năng xã hội và trở
                thành một người đàn ông, phụ nữ có trách nhiệm và tự tin trước
                tương lai.
              </p>
            </Grid>
            <Grid item xs={12} md={6}>
              <LazyLoadImage
                className="w-full"
                src={about2Img.src}
                alt="about"
              />
            </Grid>
          </Grid>
        </section>

        <section className="mb-40">
          <h2 className="text-center text-5xl mb-10">Tiện ích</h2>
          <Container maxWidth="md" className="mb-10">
            <p className="text-lg text-center">
              Donec ultricies lobortis eros, nec auctor nisl semper ultricies.
              Aliquam sodales nulla dolor, sed vulputate sapien efficitur ut.
              Etiam tincidunt ligula ut hendrerit semper. Quisque luctus lectus
              non turpis bibendum posuere. Morbi tortor nibh, fringilla sed
              pretium sit amet, pharetra non ex. Aliquam ornare nunc nibh, sit
              amet porta diam pretium in.
            </p>
          </Container>

          <Grid container spacing={6}>
            <Grid item xs={6} md={4} lg={3} className="text-center">
              <div className="flex justify-center mb-2 ">
                <LazyLoadImage src={service1Img.src} alt="service double bed" />
              </div>
              <h3 className="mb-1 text-xl">Giường tầng</h3>
              <p className="text-base">
                Ký túc xá có nhiều giường tầng chất lượng cung cấp cho sinh viên
                với giá cả hợp lý
              </p>
            </Grid>
            <Grid item xs={6} md={4} lg={3} className="text-center">
              <div className="flex justify-center mb-2 ">
                <LazyLoadImage src={service2Img.src} alt="service double bed" />
              </div>
              <h3 className="mb-1 text-xl">Ngăn chứa đồ</h3>
              <p className="text-base">
                Ký túc xá cung cấp cho từng cá nhân sinh viên ngăn chứa đô riêng
                biệt
              </p>
            </Grid>
            <Grid item xs={6} md={4} lg={3} className="text-center">
              <div className="flex justify-center mb-2 ">
                <LazyLoadImage src={service3Img.src} alt="service double bed" />
              </div>
              <h3 className="mb-1 text-xl">Tivi</h3>
              <p className="text-base">
                Mỗi phòng sẽ có một tivi để cập nhật tin tức cũng như giải trí
              </p>
            </Grid>
            <Grid item xs={6} md={4} lg={3} className="text-center">
              <div className="flex justify-center mb-2 ">
                <LazyLoadImage src={service4Img.src} alt="service double bed" />
              </div>
              <h3 className="mb-1 text-xl">Máy điều hoà</h3>
              <p className="text-base">
                Ký túc xá cung cấp máy điều hoà để sinh viên có được môi trường
                sinh hoạt tốt nhất
              </p>
            </Grid>

            <Grid item xs={6} md={4} lg={3} className="text-center">
              <div className="flex justify-center mb-2 ">
                <LazyLoadImage src={service5Img.src} alt="service double bed" />
              </div>
              <h3 className="mb-1 text-xl">Phòng tắm</h3>
              <p className="text-base">
                Ký túc xá có nhiều giường tầng chất lượng cung cấp cho sinh viên
                với giá cả hợp lý
              </p>
            </Grid>
            <Grid item xs={6} md={4} lg={3} className="text-center">
              <div className="flex justify-center mb-2 ">
                <LazyLoadImage src={service6Img.src} alt="service double bed" />
              </div>
              <h3 className="mb-1 text-xl">Giặt ủi</h3>
              <p className="text-base">
                Ký túc xá có nhiều giường tầng chất lượng cung cấp cho sinh viên
                với giá cả hợp lý
              </p>
            </Grid>
            <Grid item xs={6} md={4} lg={3} className="text-center">
              <div className="flex justify-center mb-2 ">
                <LazyLoadImage src={service7Img.src} alt="service double bed" />
              </div>
              <h3 className="mb-1 text-xl">Wifi</h3>
              <p className="text-base">
                Ký túc xá có nhiều giường tầng chất lượng cung cấp cho sinh viên
                với giá cả hợp lý
              </p>
            </Grid>
            <Grid item xs={6} md={4} lg={3} className="text-center">
              <div className="flex justify-center mb-2 ">
                <LazyLoadImage src={service8Img.src} alt="service double bed" />
              </div>
              <h3 className="mb-1 text-xl">Thể thao giải trí</h3>
              <p className="text-base">
                Ký túc xá có nhiều giường tầng chất lượng cung cấp cho sinh viên
                với giá cả hợp lý
              </p>
            </Grid>
          </Grid>
        </section>

        <section className="mb-20">
          <h2 className="text-center text-5xl mb-2">Giải trí</h2>
          <p className="text-xl text-center mb-10">
            Ký túc xá cung cấp những thiết bị giải trí giúp bạn gắn kết nhau hơn
          </p>

          <div className="h-[700px]">
            <LazyLoadImage
              src={entertainment.src}
              alt="ký túc xá đại học sài gòn giải trí"
              className="w-full h-full object-cover "
            />
          </div>
        </section>

        <section className="mb-20">
          <Grid container>
            <Grid
              item
              xs={12}
              md={8}
              className="flex flex-col items-start justify-center"
            >
              <span className="uppercase font-bold mb-5">Liên lạc</span>

              <h2 className="text-4xl mb-7">Bạn muốn cư trú tại đây</h2>

              <Link href="tel:+" className="mb-10">
                <h2 className="text-4xl">Gọi chúng tôi: (028)38753588.</h2>
              </Link>

              <Button variant="contained" size="large" className="px-10">
                Đăng ký
              </Button>
            </Grid>

            <Grid item xs={12} md={4}>
              <LazyLoadImage className="w-full" src={contactImg.src} />
            </Grid>
          </Grid>
        </section>
      </Container>
    </div>
  );
};

export default Home;
