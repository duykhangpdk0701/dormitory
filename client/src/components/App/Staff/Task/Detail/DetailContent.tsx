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
import { useAppDispatch } from "@/hooks/redux";
import staffTaskAPI from "@/api/staff/task";
import {
  setIsLoadingAction,
  setNotLoadngAction,
} from "@/contexts/slices/backDropSlice";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { useMutation, useQueryClient } from "react-query";
import getStatusLabel from "@/components/StatusLabel";
import BookingStatus from "@/enum/BookingStatus";

interface IStaffTaskDetailContent {
  data?: ITask;
}

const StaffTaskDetailContent: FC<IStaffTaskDetailContent> = (props) => {
  const { data } = props;
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const handleStart = async () => {
    dispatch(setIsLoadingAction());
    if (data) {
      await startTaskMutation.mutateAsync(data?._id);
    }
  };

  const handleCancel = async () => {
    dispatch(setIsLoadingAction());
    if (data) await CancelTaskMutation.mutateAsync(data?._id);
  };

  const handleDone = async () => {
    dispatch(setIsLoadingAction());
    if (data) await DoneTaskMutation.mutateAsync(data?._id);
  };

  const startTaskMutation = useMutation({
    mutationKey: ["task"],
    mutationFn: (id: string) => staffTaskAPI.startTask(id),
    onSuccess: async () => {
      await queryClient.refetchQueries(["task"]);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Bắt đầu thành công",
        })
      );
      dispatch(setNotLoadngAction());
    },
    onError: (error: any) => {
      dispatch(setNotLoadngAction());
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
    },
  });

  const DoneTaskMutation = useMutation({
    mutationKey: ["task"],
    mutationFn: (id: string) => staffTaskAPI.DoneTask(id),
    onSuccess: async () => {
      await queryClient.refetchQueries(["task"]);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Chúc mừng bạn đã hoàn thành công việc",
        })
      );
      dispatch(setNotLoadngAction());
    },
    onError: (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
    },
  });

  const CancelTaskMutation = useMutation({
    mutationKey: ["task"],
    mutationFn: (id: string) => staffTaskAPI.CancelTask(id),
    onSuccess: async () => {
      await queryClient.refetchQueries(["task"]);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Huỷ công việc thành công",
        })
      );
      dispatch(setNotLoadngAction());
    },
    onError: (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
    },
  });

  return (
    <Card>
      <CardHeader
        title={
          <div className="flex justify-between">
            <div>
              {data?.description}
              {data?.status !== "Pending" && (
                <Tooltip title="Bắt đầu" arrow>
                  <IconButton
                    sx={{
                      "&:hover": {
                        background: theme.colors.success.lighter,
                      },
                      color: theme.palette.success.main,
                    }}
                    color="success"
                    size="small"
                    onClick={handleStart}
                  >
                    <PlayArrowIcon />
                  </IconButton>
                </Tooltip>
              )}

              {data?.status !== "Done" && (
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
                    onClick={handleDone}
                  >
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
              )}

              {data?.status !== "Cancel" && (
                <Tooltip title="Huỷ" arrow>
                  <IconButton
                    sx={{
                      "&:hover": { background: theme.colors.error.lighter },
                      color: theme.palette.error.main,
                    }}
                    color="inherit"
                    size="small"
                    onClick={handleCancel}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>

            <div>{getStatusLabel(data?.status as BookingStatus)}</div>
          </div>
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
