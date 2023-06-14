import React, { FC } from "react";
import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

interface IPageHeader {
  title: string;
  desc: string;
  isHaveNavigateButton: boolean;
  navigationName?: string;
  link?: string;
  type?: "add" | "back" | "edit";
}

const PageHeader: FC<IPageHeader> = (props) => {
  const { title, desc, isHaveNavigateButton, link, navigationName, type } =
    props;

  const getIcon = () => {
    switch (type) {
      case "add":
        return <ArrowBackIcon fontSize="small" />;
      case "edit":
        return <EditIcon fontSize="small" />;
      default:
        return <AddTwoToneIcon fontSize="small" />;
    }
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2">{desc}</Typography>
      </Grid>
      <Grid item>
        {isHaveNavigateButton && (
          <Button
            LinkComponent={Link}
            href={link}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={getIcon()}
          >
            {navigationName}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default PageHeader;
