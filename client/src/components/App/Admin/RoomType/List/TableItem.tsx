import React, { ChangeEvent, FC } from "react";

import {
  Tooltip,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import getStatusLabel from "@/components/StatusLabel";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import IRoomType from "@/interfaces/RoomTypet";
import Link from "next/link";
import priceFormat from "@/utils/formatPrice";

interface IRoomTypeTableItem {
  data: IRoomType;
  isSelected: boolean;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const RoomTypeTableItem: FC<IRoomTypeTableItem> = (props) => {
  const { data, isSelected, handleSelectOneCryptoOrder } = props;
  const theme = useTheme();

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
        <Link
          href={`/admin/room-type/${data._id}`}
          className="flex gap-1 items-center"
        >
          <Avatar
            variant="square"
            src={process.env.NEXT_PUBLIC_SERVER_URL + data.images[0]}
          />
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
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {priceFormat(data.price)}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Tooltip title="Chỉnh sửa" arrow>
          <IconButton
            LinkComponent={Link}
            href={`/admin/room-type/${data._id}/edit`}
            sx={{
              "&:hover": {
                background: theme.colors.primary.lighter,
              },
              color: theme.palette.primary.main,
            }}
            color="inherit"
            size="small"
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xoá phòng" arrow>
          <IconButton
            sx={{
              "&:hover": { background: theme.colors.error.lighter },
              color: theme.palette.error.main,
            }}
            color="inherit"
            size="small"
          >
            <DeleteTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default RoomTypeTableItem;
