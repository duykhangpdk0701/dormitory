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
import IPermission from "@/interfaces/Permission";

interface IPermissionTableItemProps {
  isSelected: boolean;
  data: IPermission;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const PermissionTableItem: FC<IPermissionTableItemProps> = (props) => {
  const { isSelected, data, handleSelectOneCryptoOrder } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

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
        <Link href={`/admin/permission/${data._id}`}>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            noWrap
          >
            {data.name}
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
          {data.description}
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
            href={`/admin/permission/${data._id}/edit`}
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default PermissionTableItem;
