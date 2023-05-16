import React, { FC } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import cover from "@/assets/images/covers/cover_3.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ITask from "@/interfaces/Task";
import moment from "moment";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useAppDispatch } from "@/hooks/redux";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { useMutation } from "react-query";
import staffTaskAPI from "@/api/staff/task";

interface IStaffTaskItem {
  data: ITask;
}

const StaffTaskItem: FC<IStaffTaskItem> = (props) => {
  const { data } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleStart = async () => {
    await startTaskMutation.mutateAsync();
  };

  const handleCancel = async () => {
    await CancelTaskMutation.mutateAsync();
  };

  const handleDone = async () => {
    await DoneTaskMutation.mutateAsync();
  };

  const startTaskMutation = useMutation({
    mutationKey: ["task"],
    mutationFn: () => staffTaskAPI.startTask(data._id),
    onSuccess: () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Bắt đầu thành công",
        })
      );
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

  const DoneTaskMutation = useMutation({
    mutationKey: ["task"],
    mutationFn: () => staffTaskAPI.DoneTask(data._id),
    onSuccess: () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Chúc mừng bạn đã hoàn thành công việc",
        })
      );
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
    mutationFn: () => staffTaskAPI.CancelTask(data._id),
    onSuccess: () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Huỷ công việc thành công",
        })
      );
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
    <Card className="overflow-hidden  relative">
      <CardContent className="absolute bottom-0 px-6 pb-6 z-10 w-full">
        <Typography variant="caption" className="text-gray-300">
          {moment(data.dateAssign).format("DD/MM/YYYY")}
        </Typography>
        <Link href={`/staff/task/${data._id}`}>
          <Typography variant="h5" className="text-white text-base">
            {data.description}
          </Typography>
        </Link>
        <div className="mt-6 flex justify-end">
          {data.status === "Pending" && (
            <Tooltip title="Bắt đầu" arrow>
              <IconButton
                sx={{
                  "&:hover": { background: theme.colors.success.lighter },
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

          {data.status === "Working" && (
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

          {data.status !== "Cancel" && data.status !== "Done" && (
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
      </CardContent>
      <div className="top-0 w-full h-full absolute bg-black/60 z-[1]"></div>
      <div className="h-[360px] leading-[1] overflow-hidden">
        <LazyLoadImage
          src={cover.src}
          alt="Yêu cầu sửa máy quạt"
          className="w-full h-full object-cover"
        />
      </div>
    </Card>
  );
};

export default StaffTaskItem;
