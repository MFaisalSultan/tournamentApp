import { useState } from "react";

const initialData = () => {

  // [2048, 1024, 512, 256,128,64, 32, 16, 8, 4, 2 ]
  const players = [];
  Array.from(new Array(128), (element, index) => {
    players.push({
      id: index + 1,
      name: `player`,
      weighting: Math.floor(Math.random() * 2048),
    });
  });
  return players;
};

export default function useInitialiseTournament() {
  
  const [players, setPlayers] = useState(initialData());
  let noOfRounds = Math.log2(initialData().length)
  return {noOfRounds, players, setPlayers };
}
