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
import Link from "next/link";
import IService from "@/interfaces/Service";

interface IJobTableItemProps {
  isSelected: boolean;
  data: IService;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const ServiceTableItem: FC<IJobTableItemProps> = (props) => {
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

      <Link href={`/admin/service/${data._id}`}>
        <TableCell>
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {data.name}
          </Typography>
        </TableCell>
      </Link>
      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {data.description}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {data.price}
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
            href={`/admin/service/${data._id}/edit`}
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ServiceTableItem;
