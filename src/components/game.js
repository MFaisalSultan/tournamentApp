import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import useInitialiseTournament from "../helpers/tournament-initialiser.js";
import "../index.css";
import { setRounds } from "../redux/user/userSlice";
import { DataContext } from "../services/dataContext.js";
import { roundsRef, onSnapshot } from "../services/firebase.js";
import CommonAccordion from "./Accordion/index.js";
import Counter from "./Counter";
import { Round2 } from "./round.js";
import CommonTable from "./Table/index.js";

const Game = () => {
  const { tournament, loading, rounds } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  // add rounds Listner to firebase
  useEffect(() => {
    let roundsListner;
    if (tournament) {
      roundsListner = onSnapshot(roundsRef(tournament.id), (snapshot) => {
        let rounds = [];
        snapshot.docs.map((doc) => {
          rounds.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setRounds(rounds));
      });
    }
    return () => {
      roundsListner && roundsListner();
    };
  }, [tournament]);

  let TTWinners = rounds;
  let restOfAllWinners = [];
  if (tournament && tournament.rounds > 5) {
    let restIndex =
      rounds.length > tournament.rounds - 5
        ? tournament.rounds - 5
        : rounds.length;
    restOfAllWinners = rounds.slice(0, restIndex);
    TTWinners = rounds.slice(restIndex);
  }
  const round = rounds && rounds.length > 0 ? rounds[rounds.length - 1] : null;

  return (
    <div className="game">
      <div className="game-board"></div>
      {loading ? (
        <div style={{ color: "white" }}>Loading...</div>
      ) : !tournament ? (
        <h1>There is no active tournament</h1>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>
            Winners Will Display of Round {tournament.currentRound}
            <br /> After
            {/* {counter} */}
            {!!round && <Counter {...round} current={round} />}
          </h1>
          <div className="game-info" style={{ width: "90%" }}>
            {restOfAllWinners.map((entry, index) => {
              return <CommonAccordion key={index} round={round} data={entry} />;
            })}
            {TTWinners.length > 0 && (
              <CommonAccordion round={round} TTWinners={TTWinners} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
