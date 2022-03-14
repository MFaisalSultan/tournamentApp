import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  loading: false,
  error: null,
  tournaments: [],
  rounds: [],
  tournament: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setUser: (state, { payload }) => {
      state.users[payload.key] = payload.value;
    },
    setRounds: (state, { payload }) => {
      state.rounds = payload;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setTournaments: (state, { payload }) => {
      state.tournaments = payload;
    },
    checkTournament: (state) => {
      if (state.tournament) {
        let availableTournament = state.tournaments.find(
          (tournament) => tournament.id === state.tournament.id
        );
        if (availableTournament) {
          state.tournament = null;
          state.rounds = [];
        }
      }
    },
    setTournament: (state, { payload }) => {
      if (!payload) {
        state.rounds = [];
      }
      state.tournament = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setLoading,
  setError,
  setUsers,
  setRounds,
  setTournament,
  setTournaments,
  checkTournament,
} = userSlice.actions;

export default userSlice.reducer;
