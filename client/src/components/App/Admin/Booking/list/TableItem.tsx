import React, { ChangeEvent, FC } from "react";

import {
  Tooltip,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import getStatusLabel from "@/components/StatusLabel";
import IBookingRequest from "@/interfaces/BookingRequest";
import { useMutation } from "react-query";
import adminBookingRequest from "@/api/admin/bookingRequest";
import { useAppDispatch } from "@/hooks/redux";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import IBooking from "@/interfaces/Booking";
import Link from "next/link";
import BookingStatus from "@/enum/BookingStatus";

interface IBookingRequestTableItemProps {
  isSelected: boolean;
  data: IBooking;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const BookingRequestTableItem: FC<IBookingRequestTableItemProps> = (props) => {
  const { isSelected, data, handleSelectOneCryptoOrder } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleAccept = async () => {
    await acceptRequestMutation.mutateAsync();
  };

  const handleDeny = async () => {
    await denyRequestMutation.mutateAsync();
  };

  const acceptRequestMutation = useMutation({
    mutationKey: ["awating-student-request"],
    mutationFn: () => adminBookingRequest.accepted(data._id),
    onSuccess: () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Chấp nhận thành công",
        })
      );
    },
  });

  const denyRequestMutation = useMutation({
    mutationKey: ["awating-student-request"],
    mutationFn: () => adminBookingRequest.cancel(data._id),
    onSuccess: () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Từ chối thành công",
        })
      );
    },
  });

  return (
    <TableRow hover key={data._id} selected={isSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isSelected}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleSelectOneCryptoOrder(event, data._id)
          }
          value={isSelected}
        />
      </TableCell>

      <TableCell>
        <Link href={`/admin/booking/${data._id}`}>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {data.lastname + " " + data.firstname}
          </Typography>
        </Link>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {data.studentId}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {data.email}
        </Typography>
      </TableCell>
      <TableCell align="right">
        {getStatusLabel(data.status as BookingStatus)}
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Huỷ" arrow>
          <IconButton
            sx={{
              "&:hover": { background: theme.colors.error.lighter },
              color: theme.palette.error.main,
            }}
            color="inherit"
            size="small"
            onClick={handleDeny}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default BookingRequestTableItem;
