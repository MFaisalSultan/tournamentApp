import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "../components/game";
import { Round3 } from "../components/round";
import {
  setLoading,
  checkTournament,
  setTournament,
  setTournaments,
} from "../redux/user/userSlice";
import {
  lastTournamentQuery,
  onSnapshot,
  tournamentQuery,
} from "../services/firebase";
import History from "./History";
import Home from "./Home";
import Layout from "./Layout";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("setting nfts to firebase");
    dispatch(setLoading(true));
    // load all tournaments
    let lastTournamentListner = onSnapshot(lastTournamentQuery, (snapshot) => {
      console.log("last one ", snapshot.docs);
      if (snapshot.docs.length > 0) {
        const lastTournament = snapshot.docs[0].data();
        dispatch(setTournament({ ...lastTournament, id: snapshot.docs[0].id }));
        setTimeout(() => {
          dispatch(checkTournament());
        }, 3000);
      } else {
        dispatch(setTournament(null));
      }
      dispatch(setLoading(false));
    });
    let tournamentsListner = onSnapshot(tournamentQuery, (snapshot) => {
      let tournaments = [];
      snapshot.docs.map((doc) => {
        tournaments.push({ ...doc.data(), id: doc.id });
      });
      dispatch(setTournaments(tournaments));
      dispatch(setLoading(false));
    });
    return () => {
      lastTournamentListner();
      tournamentsListner();
    };
  }, []);
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </Layout>
  );
};

export default Main;
