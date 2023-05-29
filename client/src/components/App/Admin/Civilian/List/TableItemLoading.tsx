import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";

const BookingTableItemLoading = () => {
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
      <TableCell align="right">
        <Skeleton />
      </TableCell>
      <TableCell align="right">
        <div className="flex  justify-end">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BookingTableItemLoading;
