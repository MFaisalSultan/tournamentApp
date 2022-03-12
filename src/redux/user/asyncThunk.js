import { createAsyncThunk } from "@reduxjs/toolkit";
import { initialData } from "../../helpers/tournament-initialiser";
import { setLoading } from "./userSlice";

import { app, creatingTournament } from "../../services/firebase";
let counter = 0;
export const createTournaments = createAsyncThunk(
  "create/tournaments",
  async (_, { dispatch, getState }) => {
    try {
      const { tournaments, users } = getState().user;

      dispatch(setLoading(true));
      // const tournamentName = "Tournament " + (tournaments.length + 1);
      const tournament = await creatingTournament();

      console.log("tournament", tournament);
      // const { players, playersCount, rounds } = initialData(users);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  }
);
