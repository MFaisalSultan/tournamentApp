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
  // const { players, setPlayers, noOfRounds } = useInitialiseTournament();
  // const [winners, setWinners] = useState([]);
  // const [timer, setTimer] = useState(0);
  // // const { users } = useContext(DataContext);
  // console.log("rendering game");
  // const randPlayer = () => {
  //   let index =
  //     players.length > 32 ? Math.floor(Math.random() * players.length) : 0;

  //   let player = players[index];
  //   players.splice(index, 1);
  //   setPlayers(players);
  //   return player;
  // };
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

  // const winnerss = [];
  // const dataToReAssign = [];

  // const startGame = () => {
  //   let p1 = randPlayer();
  //   let p2 = randPlayer();
  //   if (!(p1 && p2)) return;

  //   let winner = p1.weighting > p2.weighting ? p1 : p2;

  //   let structure = {
  //     player1: p1,
  //     player2: p2,
  //     result: winner,
  //   };

  //   winnerss.push(structure);
  //   dataToReAssign.push(winner);

  //   if (players.length > 0) {
  //     startGame();
  //   } else {
  //     let newStructure = {
  //       name: `Round ${winners.length + 1}`,
  //       matches: winnerss,
  //     };

  //     let ter = (players.length <= 32 ? 2 : 2) * 1000 * 15;

  //     setTimer(ter);
  //     let interval = setInterval(() => {
  //       setWinners([...winners, newStructure]);
  //       if (dataToReAssign.length > 0) {
  //         if (players.length === 32)
  //           setPlayers(dataToReAssign.sort((a, b) => a.id - b.id));
  //         else setPlayers(dataToReAssign);
  //       } else {
  //         dataToReAssign = [];
  //         setPlayers(dataToReAssign);
  //       }
  //       clearInterval(interval);
  //     }, ter);
  //   }
  // };

  // useEffect(() => {
  //   startGame();
  // }, []);

  // useEffect(() => {
  //   let letSecondsInterval = setInterval(() => {
  //     if (timer > 0) {
  //       setTimer(timer - 1000);
  //     } else {
  //       startGame();
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(letSecondsInterval);
  //   };
  // }, [timer]);

  let counter = 0;
  //   timer / 1000 < 60
  //     ? timer / 1000 + " Seconds"
  //     : timer / 1000 / 60 + " Minutes";
  let TTWinners = rounds;
  let restOfAllWinners = [];
  if (tournament && tournament.rounds > 5) {
    let restIndex = rounds.length > 5 ? rounds.length - 5 : 1;
    restOfAllWinners = rounds.slice(0, restIndex);
    TTWinners = rounds.slice(restIndex);
  }
  const round = rounds.length > 0 ? rounds[rounds.length - 1] : null;

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
