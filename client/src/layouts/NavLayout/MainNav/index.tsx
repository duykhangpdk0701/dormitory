import { Container } from "@mui/material";
import Link from "next/link";
import React from "react";

const MainNav = () => {
  return (
    <nav className="py-6">
      <Container className="flex justify-between">
        <div>logo</div>
        <div>
          <ul className="flex justify-around items-center gap-12">
            <li>
              <Link href="/">Giới thiệu </Link>
            </li>
            <li>
              <Link href="/">Giới thiệu </Link>
            </li>
            <li>
              <Link href="/">Giới thiệu </Link>
            </li>
            <li>
              <Link href="/">Giới thiệu </Link>
            </li>
            <li>
              <Link href="/">Giới thiệu </Link>
            </li>
            <li>
              <Link href="/">Giới thiệu </Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default MainNav;
