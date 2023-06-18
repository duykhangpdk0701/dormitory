import React, { FC } from "react";
import { Grid } from "@mui/material";
import ServiceItem from "./Item";
import IService from "@/interfaces/Service";

interface IServiceListList {
  data?: IService[];
}

const ServiceListList: FC<IServiceListList> = (props) => {
  const { data } = props;

  return (
    <div>
      <Grid container spacing={6}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={6} xl={6}>
            <ServiceItem data={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ServiceListList;
