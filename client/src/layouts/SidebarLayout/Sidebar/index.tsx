import { FC } from "react";
import Scrollbar from "@/components/Scrollbar";

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken,
} from "@mui/material";

import SidebarMenu from "./SidebarMenu";
import Logo from "@/components/LogoSign";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { closeSidebarAction } from "@/contexts/slices/sidebarSlice";

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
`
);

interface ISidebar {
  menuType?: "user" | "staff";
}

const Sidebar: FC<ISidebar> = ({ menuType }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isSidebarOpenState = useAppSelector((state) => state.sidebar.open);

  const onCloseSidebar = () => dispatch(closeSidebarAction());

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: "none",
            lg: "inline-block",
          },
          position: "fixed",
          left: 0,
          top: 0,
          background:
            theme.palette.mode === "dark"
              ? alpha(lighten(theme.header.background || "", 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === "dark" ? theme.sidebar.boxShadow : "none",
        }}
      >
        <Scrollbar>
          <Box mt={1}>
            <Box
              mx={2}
              sx={{
                width: 52,
              }}
            >
              <Link href={"/"}>
                <Image
                  src={logo}
                  alt="logo"
                  height={60}
                  width={60}
                  className="my-1"
                />
              </Link>
            </Box>
          </Box>
          <Divider
            sx={{
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SidebarMenu menuType={menuType} />
        </Scrollbar>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={isSidebarOpenState}
        onClose={onCloseSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5),
          }}
        >
          <Scrollbar>
            <Box mt={1}>
              <Box
                mx={2}
                sx={{
                  width: 52,
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10],
              }}
            />
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
};

export default Sidebar;
