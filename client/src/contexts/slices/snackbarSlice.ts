import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISnackBarSlice {
  snackbarOpen: boolean;
  snackbarType: string;
  snackbarMessage: string;
}

const initialState: ISnackBarSlice = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

export const SnackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (
      state,
      action: PayloadAction<{
        snackbarOpen: boolean;
        snackbarMessage: string;
        snackbarType: string;
      }>
    ) => {
      const { snackbarOpen, snackbarMessage, snackbarType } = action.payload;

      return {
        ...state,
        snackbarOpen,
        snackbarMessage,
        snackbarType,
      };
    },
  },
});

export const { setSnackbar } = SnackbarSlice.actions;

export default SnackbarSlice.reducer;
