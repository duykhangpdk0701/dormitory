import React, { ChangeEvent, FC } from "react";

import {
  Checkbox,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

import Link from "next/link";
import IComplaint from "@/interfaces/Complaint";

interface IComplaintTableItemProps {
  isSelected: boolean;
  data: IComplaint;
  handleSelectOneCryptoOrder: (event: any, id: string) => void;
}

const ComplaintTableItem: FC<IComplaintTableItemProps> = (props) => {
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
      <Link href={`/admin/complaint/${data._id}`}>
        <TableCell>
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {data.title}
          </Typography>
        </TableCell>
      </Link>
      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {data.civilian.account.lastname} {data.civilian.account.firstname}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {data.civilian.studentId}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body1" color="text.primary" gutterBottom noWrap>
          {data.description}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default ComplaintTableItem;
