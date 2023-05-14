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
import IJob from "@/interfaces/Job";
import IContract from "@/interfaces/Contract";

interface IContractTableItemProps {
  isSelected: boolean;
  data: IContract;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const ContractTableItem: FC<IContractTableItemProps> = (props) => {
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
        <Link href={`/admin/contract/${data._id}`}>
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {data._id}
          </Typography>
        </Link>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {`${data.civilian.account.lastname} ${data.civilian.account.firstname}`}
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
            href={`/admin/contract/${data._id}/edit`}
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ContractTableItem;
