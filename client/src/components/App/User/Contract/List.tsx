import React from "react";
import { Grid } from "@mui/material";
import ContractItem from "./Item";

const ContractListList = () => {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <ContractItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <ContractItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <ContractItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <ContractItem />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <ContractItem />
        </Grid>
      </Grid>
    </div>
  );
};

export default ContractListList;
