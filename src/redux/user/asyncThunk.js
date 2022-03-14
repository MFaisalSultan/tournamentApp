import { createAsyncThunk } from "@reduxjs/toolkit";
import { initialData } from "../../helpers/tournament-initialiser";
import { setLoading, setError } from "./userSlice";

import { app, creatingTournament } from "../../services/firebase";
export const createTournaments = createAsyncThunk(
  "create/tournaments",
  async (_, { dispatch, getState }) => {
    try {
      const { tournaments, users } = getState().user;

      dispatch(setLoading(true));
      // const tournamentName = "Tournament " + (tournaments.length + 1);
      const tournament = await creatingTournament();

      if (!tournament.data.success) {
        dispatch(setError(tournament.data.message));
      }
      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
      console.log("tournament", tournament);
      // const { players, playersCount, rounds } = initialData(users);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  }
);
