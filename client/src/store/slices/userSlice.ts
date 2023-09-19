import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../servicesTypes/userTypes";

type userState= {
  isAuthenticated : boolean;
  user : User
};

const userSlice = createSlice({
  name: "dateSlice",
  initialState: {
    isAuthenticated : false,
    user : {}
  } as userState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.isAuthenticated = true;
    },
    resetUser(state) {
      state.user = {} as User;
      state.isAuthenticated = false;
    }
  },
});

export default userSlice.reducer;

export const { setUser,resetUser } = userSlice.actions; 