import { FC, ChangeEvent, useState, Fragment } from "react";

import {
  Divider,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  CardHeader,
  Typography,
  TextField,
} from "@mui/material";

import BulkActions from "./BulkActions";
import JobTableItem from "./TableItem";
import IJob from "@/interfaces/Job";
import { IJobParams } from "@/pages/admin/job";

import {
  Control,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormWatch,
} from "react-hook-form";

interface IJobTableProps {
  className?: string;
  data?: IJob[];
  control: Control<IJobParams, any>;
  handleSubmit: UseFormHandleSubmit<IJobParams>;
  onSubmit: SubmitHandler<IJobParams>;
  watch: UseFormWatch<IJobParams>;
  isLoading: boolean;
}

const JobTable: FC<IJobTableProps> = (props) => {
  const { data, control, handleSubmit, onSubmit, watch, isLoading } = props;
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? data?.map((cryptoOrder) => cryptoOrder._id) || []
        : []
    );
  };

  const isNotFound = !data?.length && !!watch("search") && !isLoading;

  const emptyRows =
    watch("page") > 0
      ? Math.max(
          0,
          (1 + watch("page")) * watch("rowPerPage") - (data?.length || 0)
        )
      : 0;

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId,
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const selectedSomeCryptoOrders = selectedCryptoOrders.length > 0;

  const selectedAllCryptoOrders = data?.length
    ? selectedCryptoOrders.length === data.length
    : false;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        {selectedBulkActions && (
          <Box flex={1} p={2}>
            <BulkActions />
          </Box>
        )}
        {!selectedBulkActions && (
          <CardHeader
            action={
              <Box width={150}>
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Tìm kiếm..."
                      label="Tìm kiếm"
                    />
                  )}
                />
              </Box>
            }
          />
        )}
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedAllCryptoOrders}
                    indeterminate={selectedSomeCryptoOrders}
                    onChange={handleSelectAllCryptoOrders}
                  />
                </TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((job) => {
                const isCryptoOrderSelected = selectedCryptoOrders.includes(
                  job._id
                );
                return (
                  <Fragment key={job._id}>
                    <JobTableItem
                      isSelected={isCryptoOrderSelected}
                      data={job}
                      handleSelectOneCryptoOrder={handleSelectOneCryptoOrder}
                    />
                  </Fragment>
                );
              })}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={99} sx={{ py: 10 }}>
                    <Box
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Không tìm thấy
                      </Typography>

                      <Typography variant="body2">
                        Không có kết quả tìm kiếm cho &nbsp;
                        <strong>&quot;{watch("search")}&quot;</strong>.
                        <br /> Hãy thử kiểm tra cú pháp hoặc nhập đầy đủ từ.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Box p={2}>
          <Controller
            control={control}
            name="rowPerPage"
            render={({
              field: { value: rowPerPageValue, onChange: rowPerPageOnChange },
            }) => (
              <Controller
                control={control}
                name="page"
                render={({ field: { value, onChange } }) => (
                  <TablePagination
                    component="div"
                    count={data?.length || 0}
                    onPageChange={(e, page) => onChange(page)}
                    onRowsPerPageChange={(e) =>
                      rowPerPageOnChange(e.target.value)
                    }
                    page={value - 1}
                    rowsPerPage={rowPerPageValue}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                  />
                )}
              />
            )}
          />
        </Box>
      </Card>
    </form>
  );
};

export default JobTable;
