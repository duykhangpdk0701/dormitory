import { Skeleton } from "@mui/material";
import React from "react";

const RoomTypeItemLoading = () => {
  return (
    <Skeleton
      variant="rounded"
      className="w-full"
      height={360}
      animation="wave"
    />
  );
};

export default RoomTypeItemLoading;
