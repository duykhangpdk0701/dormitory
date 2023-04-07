import React from "react";
import { Container, Grid, Divider } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-sky-800 text-white">
      <Container className="py-10">
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <h2 className="text-lg font-bold uppercase">Liên kết</h2>
            <Divider className="bg-gray-400 my-2" />
            <div>
              <ul>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
              </ul>
            </div>
          </Grid>

          <Grid item md={4} xs={12}>
            <h2 className="text-lg font-bold uppercase">Liên kết</h2>
            <Divider className="bg-gray-400 my-2" />
            <div>
              <ul>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
                <li className="my-1">
                  <Link href="/">Giới thiệu </Link>
                </li>
              </ul>
            </div>
          </Grid>

          <Grid item md={4} xs={12}>
            <h2 className="text-lg font-bold uppercase">Ký túc xá</h2>
            <Divider className="bg-gray-400 my-2" />
            <div>
              <div>
                <b>Đại học Sài Gòn</b>
                <br />
                <span>Số 1 An Dương Vương, Quận 5, Thành Phố Hồ Chí Minh</span>
                <br />
                <span>Số điện thoại: 0793607376</span>
                <br />
                <span>Email: ktx@sgu.edu.vn</span>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
