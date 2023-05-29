import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";

const RoomTableItemLoading = () => {
  return (
    <TableRow hover>
      <TableCell className="px-auto">
        <Skeleton variant="rectangular" width={20} height={20} />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell align="right">
        <Skeleton />
      </TableCell>
      <TableCell align="right">
        <div className="flex  justify-end gap-4">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="circular" width={30} height={30} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RoomTableItemLoading;
