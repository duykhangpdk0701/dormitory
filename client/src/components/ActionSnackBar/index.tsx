import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { Slide } from "@mui/material";

const ActionSnackbar = () => {
  const dispatch = useAppDispatch();
  const snackbarOpen = useAppSelector(
    (state) => state.SnackBarSlice.snackbarOpen
  );
  const snackbarType = useAppSelector(
    (state) => state.SnackBarSlice.snackbarType
  );
  const snackbarMessage = useAppSelector(
    (state) => state.SnackBarSlice.snackbarMessage
  );

  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      setSnackbar({
        snackbarOpen: false,
        snackbarType,
        snackbarMessage,
      })
    );
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Slide}
      >
        <Alert severity={snackbarType} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ActionSnackbar;
