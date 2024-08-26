import { createSlice } from "@reduxjs/toolkit";

const mode = localStorage.getItem('house_of_geniuses_mode')

const initialState = {
  id: "default",
  opened: false,
  direction : 'ltr',
  mode : mode || 'light'
};
const customizationSlice = createSlice({
  name: "customization",
  initialState,
  reducers: {
    SET_MENU_ITEM: (state, action) => {
      state.id = action.payload;
    },
    TOGGLE_COLAPSED: (state) => {
      state.opened = !state.opened;
    },
    SET_DIRECTION : (state , action) => {
      state.direction = action.payload
    },
    CHANGE_MODE : (state) => {
      const mode = state.mode === 'light' ? 'dark' : 'light'
      state.mode = mode
      localStorage.setItem('house_of_geniuses_mode' , mode)
    }
  },
});

export default customizationSlice;

export const { SET_MENU_ITEM, TOGGLE_COLAPSED , SET_DIRECTION , CHANGE_MODE } = customizationSlice.actions;
