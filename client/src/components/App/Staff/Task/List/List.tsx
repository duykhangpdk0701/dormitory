import React, { FC } from "react";
import { Grid } from "@mui/material";
import StaffTaskItem from "./Item";
import ITask from "@/interfaces/Task";

interface IStaffTaskListList {
  data?: ITask[];
}

const StaffTaskListList: FC<IStaffTaskListList> = (props) => {
  const { data } = props;

  return (
    <div>
      <Grid container spacing={6}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={item._id}>
            <StaffTaskItem data={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default StaffTaskListList;
