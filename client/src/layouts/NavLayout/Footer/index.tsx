import React from "react";
import { Container, Grid, Divider } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-sky-800 text-white">
      <Container className="py-10">
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <h2 className="text-lg font-bold uppercase">Liên kết</h2>
            <Divider className="bg-gray-400 my-2" />
            <div>
              <ul>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/room-type">Phòng ở</Link>
                </li>
                <li className="my-1">
                  <Link href="/enroll">Đăng ký</Link>
                </li>
                <li className="my-1">
                  <Link href="/notification">Thông báo</Link>
                </li>
              </ul>
            </div>
          </Grid>

          <Grid item md={6} xs={12}>
            <h2 className="text-lg font-bold uppercase">Ký túc xá</h2>
            <Divider className="bg-gray-400 my-2" />
            <div>
              <div>
                <b>Đại học Sài Gòn</b>
                <br />
                <span>
                  <Link
                    href="https://goo.gl/maps/gxq2pJyYMKEVLnrd6"
                    target="_blank"
                  >
                    Số 1 An Dương Vương, Quận 5, Thành Phố Hồ Chí Minh
                  </Link>
                </span>
                <br />
                <span>
                  Số điện thoại:{" "}
                  <Link href="tell:02838753588">(028)38753588.</Link>
                </span>
                <br />
                <span>
                  Email:{" "}
                  <Link href="mail:kytucxa@sgu.edu.vn">kytucxa@sgu.edu.vn</Link>
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
