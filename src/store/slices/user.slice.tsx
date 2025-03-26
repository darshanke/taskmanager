import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type User = string | null;
type profilephoto = User;
interface UserDetails  {
    name: User, 
    profilephoto: profilephoto, 
}

const INITIAL_STATE:UserDetails  = {
   name: localStorage.getItem("user"),
   profilephoto: localStorage.getItem("image"), 
}

const userSlice  = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action: PayloadAction<UserDetails>) => {
        state.name = action.payload.name;
        state.profilephoto = action.payload.profilephoto;
        localStorage.setItem("user", state.name || "");     
        localStorage.setItem("image", state.profilephoto || "");
      },
      clearUser: (state) => {
        state.name = null;
        state.profilephoto = null;
        localStorage.removeItem("user");
        localStorage.removeItem("image");
      },
  }
})
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

