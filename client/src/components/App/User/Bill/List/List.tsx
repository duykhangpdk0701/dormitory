import React, { FC } from "react";
import { Grid } from "@mui/material";
import BillItem from "./Item";
import IBill from "@/interfaces/Bill";

interface IBillListList {
  data?: IBill[];
}

const BillListList: FC<IBillListList> = (props) => {
  const { data } = props;

  return (
    <div>
      <Grid container spacing={6}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={6} xl={6}>
            <BillItem data={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BillListList;
