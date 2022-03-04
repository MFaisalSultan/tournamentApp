import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useInitialiseTournament from "../helpers/tournament-initialiser.js";
import "../index.css";
import Round, { Round2 } from "./round.js";

const Game = () => {
  const { players, setPlayers, noOfRounds } = useInitialiseTournament();
  const [winners, setWinners] = useState([]);
  const [timer, setTimer] = useState(0);

  const randPlayer = () => {
    let index = players.length > 32? Math.floor(Math.random() * players.length):0

    let player = players[index];
    players.splice(index, 1);
    setPlayers(players);
    return player;
  };

  const winnerss = [];
  const dataToReAssign = [];

  const startGame = () => {
    let p1 = randPlayer();
    let p2 = randPlayer();
    if (!(p1 && p2)) return;

    let winner = p1.weighting > p2.weighting ? p1 : p2;

    let structure = {
      player1: p1,
      player2: p2,
      result: winner,
    };

    winnerss.push(structure);
    dataToReAssign.push(winner);

    if (players.length > 0) {
      startGame();
    } else {
      let newStructure = {
        name: `Round ${winners.length + 1}`,
        matches: winnerss,
      };

      let ter = (players.length <= 32 ? 2 : 2) * 1000;

      setTimer(ter);
      let interval = setInterval(() => {
        setWinners([...winners, newStructure]);
        if (dataToReAssign.length > 0) {
          if(players.length === 32) setPlayers(dataToReAssign.sort((a,b)=>a.id-b.id));
          else setPlayers(dataToReAssign)
        } else {
          dataToReAssign = [];
          setPlayers(dataToReAssign);
        }
        clearInterval(interval);
      }, ter);
    }
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    let letSecondsInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1000);
      } else {
        startGame();
      }
    }, 1000);

    return () => {
      clearInterval(letSecondsInterval);
    };
  }, [timer]);

  let counter =
    timer / 1000 < 60
      ? timer / 1000 + " Seconds"
      : timer / 1000 / 60 + " Minutes";
  let TTWinners = winners;
  let restOfAllWinners = [];
  if (noOfRounds > 6) {
    let restIndex = winners.length > 6 ? winners.length - 6 : 1;
    restOfAllWinners = winners.slice(0, restIndex);
    TTWinners = winners.slice(restIndex);
  }
  return (
    <div>
      <div className="game">
        <div className="game-board"></div>
        <h1>Winners Will Display After {counter}</h1>
        <div className="game-info" style={{width:'90%'}}>
          <table>
            {restOfAllWinners.map((entry, index) => {
              return (
                <>
                  <h1 style={{ padding: "0px 10px" }}>{entry.name}</h1>
                  {entry.matches.map((match, ind) => {
                    return (
                      <tr key={ind}>
                        <td>Fighter #{match?.player1?.id}</td>
                        <td className="weigh">| {match?.player1?.weighting}</td>
                        <td>vs</td>
                        <td>Fighter #{match?.player2?.id}</td>
                        <td className="weigh">| {match?.player2?.weighting}</td>
                        <td>Winner: </td>
                        <td>Fighter #{match?.result?.id}</td>
                        <td className="weigh">| {match?.result?.weighting}</td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </table>
          {TTWinners.length > 0 && (
            // <section id="bracket">
              <Round2 rounds={TTWinners} />
            // </section>
          )}
        </div>
      </div>
    </div>
  );
};

export const Config = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/round" element={<Round />} />
        <Route path="/round2" element={<Round2 />} />
      </Routes>
    </Router>
  );
};

export default Game;
