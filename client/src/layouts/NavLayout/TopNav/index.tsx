import {
  ButtonBase,
  Container,
  Menu,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { MouseEvent, useState } from "react";

const TopNav = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="bg-sky-800 text-white">
      <Container className="py-1.5">
        <div className="flex justify-between items-center">
          <div>Đại học Sài Gòn</div>

          <ButtonBase onClick={handleClick} aria-describedby={id}>
            Click me
          </ButtonBase>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <MenuList className="p-0">
              <MenuItem>
                <span>English</span>
              </MenuItem>
              <MenuItem>
                <span>Viet Nam</span>
              </MenuItem>
            </MenuList>
          </Popover>
        </div>
      </Container>
    </div>
  );
};

export default TopNav;
