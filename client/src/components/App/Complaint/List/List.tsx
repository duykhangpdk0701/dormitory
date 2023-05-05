import React from "react";
import { Grid } from "@mui/material";
import ComplaintItem from "./Item";

const ComplaintListList = () => {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <ComplaintItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <ComplaintItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <ComplaintItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <ComplaintItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <ComplaintItem />
        </Grid>
      </Grid>
    </div>
  );
};

export default ComplaintListList;
