import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  [key: string]: any;
}
export interface StateType {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: StateType = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: StateType, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state: StateType) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
