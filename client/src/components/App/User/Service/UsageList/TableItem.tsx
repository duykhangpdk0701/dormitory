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
import CloseIcon from "@mui/icons-material/Close";

import Link from "next/link";
import IServiceUsage from "@/interfaces/ServiceUsage";
import priceFormat from "@/utils/formatPrice";

interface IJobTableItemProps {
  isSelected: boolean;
  data: IServiceUsage;
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

      <TableCell>
        <Link href={`/admin/service/${data._id}`}>
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {data.service.name}
          </Typography>
        </Link>
      </TableCell>

      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {data.service.price && priceFormat(data.service.price)}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Tooltip title="Huỷ sửa dụng dịch" arrow>
          <IconButton
            sx={{
              "&:hover": { background: theme.colors.error.lighter },
              color: theme.palette.error.main,
            }}
            color="inherit"
            size="small"
            // onClick={handleDeny}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ServiceTableItem;
