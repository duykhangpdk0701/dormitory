import { Container } from "@mui/material";
import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "@/assets/logo.png";
import Image from "next/image";

const MainNav = () => {
  return (
    <nav className="py-3">
      <Container className="flex justify-between items-center">
        <Link href="/">
          <Image src={logo.src} height={50} width={50} alt="sgu" />
        </Link>
        <div>
          <ul className="flex justify-around items-center gap-12">
            <li>
              <Link href="/">Giới thiệu </Link>
            </li>
            <li>
              <Link href="/enroll">Đăng ký </Link>
            </li>
            <li>
              <Link href="/announcement"> Thông báo</Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default MainNav;
