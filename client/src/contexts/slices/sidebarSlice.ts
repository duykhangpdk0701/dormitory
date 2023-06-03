import { createSlice } from "@reduxjs/toolkit";

export interface ISidebarContent {
  open: boolean;
}

const initialState: ISidebarContent = {
  open: false,
};

export const SidebarSlice = createSlice({
  name: "slicebar",
  initialState,
  reducers: {
    openSidebarAction: (state) => {
      state.open = true;
    },
    closeSidebarAction: (state) => {
      state.open = false;
    },
    toggleSidebarAciton: (state) => {
      state.open = !state.open;
    },
  },
});

export const { openSidebarAction, closeSidebarAction, toggleSidebarAciton } =
  SidebarSlice.actions;

export default SidebarSlice.reducer;
