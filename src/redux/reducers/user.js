import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      const { password, ...stateUser } = action.payload;
      return stateUser;
    },
    favoriteAdded: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
    favoriteRemoved: (state, action) => {
      const newFavoriteMovie = state.favoriteMovies.filter(
        (movie) => movie !== action.payload
      );
      state.favoriteMovies = newFavoriteMovie;
    },
  },
});

export const { setUser, favoriteAdded, favoriteRemoved } = userSlice.actions;
export default userSlice.reducer;
