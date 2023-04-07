import React, { FC, ReactNode } from "react";
import TopNav from "./TopNav";
import MainNav from "./MainNav";
import Footer from "./Footer";
import CopyRight from "./CopyRight";

interface INavLayoutProps {
  children?: ReactNode;
}

const NavLayout: FC<INavLayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <TopNav />
        <MainNav />
      </header>
      <main>{children}</main>
      <Footer />
      <CopyRight />
    </>
  );
};

export default NavLayout;
