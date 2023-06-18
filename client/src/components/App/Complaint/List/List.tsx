import React, { FC } from "react";
import { Grid } from "@mui/material";
import ComplaintItem from "./Item";
import IComplaint from "@/interfaces/Complaint";

interface IComplaintListList {
  data?: IComplaint[];
}

const ComplaintListList: FC<IComplaintListList> = (props) => {
  const { data } = props;
  return (
    <div>
      <Grid container spacing={6}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={item._id}>
            <ComplaintItem data={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ComplaintListList;
