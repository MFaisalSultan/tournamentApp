import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  loading: false,
  error: null,
  tournaments: [],
  tournament: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, { payload }) => {
      state.users[payload.key] = payload.value;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setTournaments: (state, { payload }) => {
      state.tournaments = payload;
    },
    setTournament: (state, { payload }) => {
      state.tournament = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoading, setUsers, setTournament, setTournaments } =
  userSlice.actions;

export default userSlice.reducer;
