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

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useMutation } from "react-query";
import adminBookingRequest from "@/api/admin/bookingRequest";
import { useAppDispatch } from "@/hooks/redux";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import Link from "next/link";
import ICivilian from "@/interfaces/Civilian";

interface ICivilianTableItemProps {
  isSelected: boolean;
  data: ICivilian;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const CivilianTableItem: FC<ICivilianTableItemProps> = (props) => {
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
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {data._id}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Tooltip title="Chỉnh sửa" arrow>
          <IconButton
            sx={{
              "&:hover": {
                background: theme.colors.primary.lighter,
              },
              color: theme.palette.primary.main,
            }}
            color="inherit"
            size="small"
            LinkComponent={Link}
            href={`/admin/permission/${data._id}`}
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default CivilianTableItem;
