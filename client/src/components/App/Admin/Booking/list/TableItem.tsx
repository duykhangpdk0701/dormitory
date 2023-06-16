import React, { ChangeEvent, FC, useState } from "react";

import {
  Tooltip,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import getStatusLabel from "@/components/StatusLabel";
import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "@/hooks/redux";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import IBooking from "@/interfaces/Booking";
import Link from "next/link";
import BookingStatus from "@/enum/BookingStatus";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import adminBooking from "@/api/admin/booking";

interface IBookingRequestTableItemProps {
  isSelected: boolean;
  data: IBooking;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const BookingRequestTableItem: FC<IBookingRequestTableItemProps> = (props) => {
  const { isSelected, data, handleSelectOneCryptoOrder } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handlePaid = async () => {
    setIsLoading(true);
    await paidBookingMutation.mutateAsync();
  };

  const handleDeposit = async () => {
    setIsLoading(true);
    await depositBookingMutation.mutateAsync();
  };

  const handleCancel = async () => {
    setIsLoading(true);
    await cancelBookingMutation.mutateAsync();
  };

  const paidBookingMutation = useMutation({
    mutationKey: ["booking"],
    mutationFn: () => adminBooking.paid(data._id),
    onSuccess: async () => {
      await queryClient.refetchQueries(["booking"]);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thay đổi thành công thành công",
        })
      );
      setIsLoading(false);
    },
    onError: (error) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Xin vui lòng thử lại sau",
        })
      );
      setIsLoading(false);
    },
  });

  const depositBookingMutation = useMutation({
    mutationKey: ["booking"],
    mutationFn: () => adminBooking.deposit(data._id),
    onSuccess: async () => {
      await queryClient.refetchQueries(["booking"]);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thay đôi thành công thành công",
        })
      );
      setIsLoading(false);
    },
    onError: (error) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Xin vui lòng thử lại sau",
        })
      );
      setIsLoading(false);
    },
  });

  const cancelBookingMutation = useMutation({
    mutationKey: ["booking"],
    mutationFn: () => adminBooking.cancel(data._id),
    onSuccess: () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Thay đôi thành công thành công",
        })
      );
      setIsLoading(false);
    },
    onError: () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Xin vui lòng thử lại sau",
        })
      );
      setIsLoading(false);
    },
  });

  return (
    <>
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
          <Tooltip title="Đã thanh toán" arrow>
            <IconButton
              sx={{
                "&:hover": { background: theme.colors.primary.lighter },
                color: theme.palette.primary.main,
              }}
              color="inherit"
              size="small"
              onClick={handlePaid}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Đã đặt cọc" arrow>
            <IconButton
              sx={{
                "&:hover": { background: theme.colors.success.lighter },
                color: theme.palette.success.main,
              }}
              color="inherit"
              size="small"
              onClick={handleDeposit}
            >
              <AttachMoneyIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Huỷ" arrow>
            <IconButton
              sx={{
                "&:hover": { background: theme.colors.error.lighter },
                color: theme.palette.error.main,
              }}
              color="inherit"
              size="small"
              onClick={handleCancel}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <Backdrop className="z-[1000]" open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default BookingRequestTableItem;
