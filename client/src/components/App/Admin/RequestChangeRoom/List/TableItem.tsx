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
import getStatusLabel from "@/components/StatusLabel";
import Link from "next/link";
import BookingStatus from "@/enum/BookingStatus";
import IRequestChangeRoom from "@/interfaces/RequestChangeRoom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "react-query";
import adminRequestChangeRoomeAPI from "@/api/admin/requestChangeRoomAPI";
import { useAppDispatch } from "@/hooks/redux";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import {
  setIsLoadingAction,
  setNotLoadngAction,
} from "@/contexts/slices/backDropSlice";

interface IRequestChangeRoomTableItem {
  data: IRequestChangeRoom;
  isSelected: boolean;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const AdminRequestChangeRoomTableItem: FC<IRequestChangeRoomTableItem> = (
  props
) => {
  const { data, isSelected, handleSelectOneCryptoOrder } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const acceptRequestMutation = useMutation({
    mutationKey: ["request-change-room"],
    mutationFn: () => adminRequestChangeRoomeAPI.accepted(data._id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["request-change-room"] });
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Chấp nhận thành công",
        })
      );
      dispatch(setNotLoadngAction());
    },
    onError: (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
      dispatch(setNotLoadngAction());
    },
  });

  const denyRequestMutation = useMutation({
    mutationKey: ["request-change-room"],
    mutationFn: () => adminRequestChangeRoomeAPI.deny(data._id),
    onSuccess: async () => {
      await queryClient.refetchQueries(["request-change-room"]);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Từ chối thành công",
        })
      );
      dispatch(setNotLoadngAction());
    },
    onError: (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
      dispatch(setNotLoadngAction());
    },
  });

  const handleAccept = async () => {
    dispatch(setIsLoadingAction());
    await acceptRequestMutation.mutateAsync();
  };

  const handleDeny = async () => {
    dispatch(setIsLoadingAction());
    await denyRequestMutation.mutateAsync();
  };

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
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          <Link href={`/admin/request-change-room/${data._id}`}>
            {data.user.firstname} {data.user.lastname}
          </Link>
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {data.roomType.name}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" color="text.secondary" noWrap>
          {data.roomType.name}
        </Typography>
      </TableCell>

      <TableCell align="right">
        {getStatusLabel(data.status as BookingStatus)}
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Chấp nhận" arrow>
          <IconButton
            sx={{
              "&:hover": {
                background: theme.colors.primary.lighter,
              },
              color: theme.palette.primary.main,
            }}
            color="inherit"
            size="small"
            onClick={handleAccept}
          >
            <CheckIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Từ chối" arrow>
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

export default AdminRequestChangeRoomTableItem;
