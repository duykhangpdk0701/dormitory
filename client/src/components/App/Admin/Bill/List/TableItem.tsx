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
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Link from "next/link";

import IBill from "@/interfaces/Bill";
import { useAppDispatch } from "@/hooks/redux";
import { useMutation } from "react-query";
import adminBillAPI from "@/api/admin/bill";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";

interface IBillTableItemProps {
  isSelected: boolean;
  data: IBill;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const BillTableItem: FC<IBillTableItemProps> = (props) => {
  const { isSelected, data, handleSelectOneCryptoOrder } = props;
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const handlePaid = async () => {
    await paidBillMutation.mutateAsync();
  };

  const paidBillMutation = useMutation({
    mutationKey: ["bill"],
    mutationFn: () => adminBillAPI.paid(data._id),
    onSuccess: () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Đã chuyển sang trạng thái đã trả",
        })
      );
    },
    onError: (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
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
        <Link href={`/admin/bill/${data._id}`}>
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {data.civilian.account.username}
          </Typography>
        </Link>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {data.room.name}
        </Typography>
      </TableCell>

      <TableCell align="right">
        {!data.paid && (
          <Tooltip title="Đã thanh toán" arrow>
            <IconButton
              sx={{
                "&:hover": {
                  background: theme.colors.primary.lighter,
                },
                color: theme.palette.primary.main,
              }}
              color="inherit"
              size="small"
              onClick={handlePaid}
            >
              <CreditScoreIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

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
            href={`/admin/bill/${data._id}/edit`}
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default BillTableItem;
