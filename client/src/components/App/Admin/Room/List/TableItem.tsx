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
import IRoom from "@/interfaces/Room";
import getStatusLabel from "@/components/StatusLabel";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

interface IRoomTableItem {
  data: IRoom;
  isSelected: boolean;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const RoomTableItem: FC<IRoomTableItem> = (props) => {
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
      <TableCell>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {data.name}
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
          {data.description}
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
          {data.numberBed}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" color="text.secondary" noWrap>
          {data.numberPeople}
        </Typography>
      </TableCell>
      <TableCell align="center">{data.area}</TableCell>
      <TableCell align="right">{getStatusLabel("completed")}</TableCell>
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

export default RoomTableItem;
