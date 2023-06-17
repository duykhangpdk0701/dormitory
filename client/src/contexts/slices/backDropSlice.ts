import { createSlice } from "@reduxjs/toolkit";

export interface IBackDropContent {
  open: boolean;
}

const initialState: IBackDropContent = {
  open: false,
};

export const BackDropSlice = createSlice({
  name: "back-drop",
  initialState,
  reducers: {
    setIsLoadingAction: (state) => {
      state.open = true;
    },
    setNotLoadngAction: (state) => {
      state.open = false;
    },
  },
});

export const { setIsLoadingAction, setNotLoadngAction } = BackDropSlice.actions;

export default BackDropSlice.reducer;
