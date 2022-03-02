import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useInitialiseTournament from "../helpers/tournament-initialiser.js";
import "../index.css";
import Round from "./round.js";

const Game = () => {
  const { players, setPlayers } = useInitialiseTournament();
  const [winners, setWinners] = useState([]);
  const [timer, setTimer] = useState(0);

  const randPlayer = () => {
    let index = Math.floor(Math.random() * players.length);
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
          setPlayers(dataToReAssign);
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
  console.log(winners, 'my winners')
  return (
    <div>
      <div className="game">
        <div className="game-board"></div>
        <h1>Winners Will Display After {counter}</h1>
        <div className="game-info">
          <table>
            {winners.map((entry, index) => {
              return (
                <>
                  <h1 style={{ padding: "0px 10px" }}>{entry.name}</h1>
                  {
                    entry.matches.length <= 16 ? 
                    <section id="bracket">
                    <div className="container">
                    {
                    entry.matches.map(({player1,player2,result}, ind) => {
                      <Round />
                    })  
                    }   
                    </div>
                  </section> 
                  
                    :
                      entry.matches.map((match, ind) => {
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
                      })

                  }
                </>
              );
            })}
          </table>
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
      </Routes>
    </Router>
  )
}

export default Game;
