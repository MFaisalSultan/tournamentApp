import { useState } from "react";

const initialData = () => {
  const players = [];
  Array.from(new Array(4), (element, index) => {
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
