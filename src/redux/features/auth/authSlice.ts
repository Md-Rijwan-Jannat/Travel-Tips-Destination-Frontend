import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string | null;
    email: string | null;
    role: string | null;
  };
  token: string | null;
}

const initialState: AuthState = {
  user: {
    id: null,
    email: null,
    role: null,
  },
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: { id: string; email: string; role: string };
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearCredentials: (state) => {
      state.user = { id: null, email: null, role: null };
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
