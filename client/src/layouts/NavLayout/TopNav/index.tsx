import { Container } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const TopNav = () => {
  return (
    <div className="bg-sky-800 text-white">
      <Container className="py-1.5">
        <div className="flex justify-between items-center">
          <div>Đại học Sài Gòn</div>
          <Link href="/auth/login">Đăng nhập</Link>
        </div>
      </Container>
    </div>
  );
};

export default TopNav;
