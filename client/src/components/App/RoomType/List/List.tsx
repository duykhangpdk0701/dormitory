import React, { FC } from "react";
import { Grid } from "@mui/material";
import RoomTypeItem from "./Item";
import IRoomType from "@/interfaces/RoomTypet";
import RoomTypeItemLoading from "./ItemLoading";

interface IRoomTypeListList {
  data?: IRoomType[];
  isLoading: boolean;
}

const RoomTypeListList: FC<IRoomTypeListList> = (props) => {
  const { data, isLoading } = props;
  return (
    <div>
      <Grid container spacing={3}>
        {isLoading
          ? Array(10).fill(
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <RoomTypeItemLoading />
              </Grid>
            )
          : data?.map((item) => (
              <Grid item xs={12} sm={6} md={4} xl={3} key={item._id}>
                <RoomTypeItem data={item} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default RoomTypeListList;
