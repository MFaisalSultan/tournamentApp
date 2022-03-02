import { useState } from "react";

const initialData = () => {

// [2048, 1024, 512, 256,128,64, 32, 16, 8, 4, 2 ]
  const players = [];
  Array.from(new Array(64), (element, index) => {
    players.push({
      id: index + 1,
      name: `player${index + 1}`,
      weighting: Math.floor(Math.random() * 2048),
    });
  });
  return players;
};

export default function useInitialiseTournament() {
  const [players, setPlayers] = useState(initialData());
  return { players, setPlayers };
}
