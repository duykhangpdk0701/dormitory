import React, { FC } from "react";
import {
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import ITask from "@/interfaces/Task";
import moment from "moment";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface IStaffTaskDetailContent {
  data?: ITask;
}

const StaffTaskDetailContent: FC<IStaffTaskDetailContent> = (props) => {
  const { data } = props;
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        title={
          <>
            {data?.description}
            {data?.status === "Pending" && (
              <Tooltip title="Bắt đầu" arrow>
                <IconButton
                  sx={{
                    "&:hover": { background: theme.colors.success.lighter },
                    color: theme.palette.success.main,
                  }}
                  color="success"
                  size="small"
                  // onClick={handleStart}
                >
                  <PlayArrowIcon />
                </IconButton>
              </Tooltip>
            )}

            {data?.status === "Working" && (
              <Tooltip title="Hoàn thành" arrow>
                <IconButton
                  sx={{
                    "&:hover": {
                      background: theme.colors.primary.lighter,
                    },
                    color: theme.palette.primary.main,
                  }}
                  color="inherit"
                  size="small"
                  // onClick={handleDone}
                >
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            )}

            {data?.status !== "Cancel" && data?.status !== "Done" && (
              <Tooltip title="Huỷ" arrow>
                <IconButton
                  sx={{
                    "&:hover": { background: theme.colors.error.lighter },
                    color: theme.palette.error.main,
                  }}
                  color="inherit"
                  size="small"
                  // onClick={handleCancel}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            )}
          </>
        }
      />
      <Divider />
      <div className="p-10">
        <Grid container rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Tên Nhân viên</span>:{" "}
              <span className="text-base">
                {data?.staff.account.lastname} {data?.staff.account.firstname}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-base font-bold">Ngày đăng ký</span>:{" "}
              <span className="text-base">
                {moment(data?.dateAssign).format("DD/MM/YYYY")}
              </span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Mô tả</span>:{" "}
              <span className="text-base">{data?.description}</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default StaffTaskDetailContent;
