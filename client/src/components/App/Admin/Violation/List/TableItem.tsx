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
import { useAppDispatch } from "@/hooks/redux";
import Link from "next/link";
import IViolation from "@/interfaces/Violation";

interface IViolationTableItemProps {
  isSelected: boolean;
  data: IViolation;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const ViolationTableItem: FC<IViolationTableItemProps> = (props) => {
  const { isSelected, data, handleSelectOneCryptoOrder } = props;
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
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {data.title}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {data.description}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {`${data.civilian.account.lastname} ${data.civilian.account.firstname}`}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {data.civilian.studentId}
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
            href={`/admin/job/${data._id}`}
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ViolationTableItem;
