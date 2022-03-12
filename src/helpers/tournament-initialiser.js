import { useState } from "react";
import { useSelector } from "react-redux";

export const initialData = (players) => {
  // incomming total players
  const totalPlayers = players.length;
  // total  no of rounds
  const rounds = Math.floor(Math.log2(totalPlayers));
  // total no of matches
  const selectedPlayers = Math.pow(2, rounds);
  // random players selected
  const playersWithInfo = {};

  // checking if selectedPlayers is greater than total selected players
  while (Object.keys(playersWithInfo).length < selectedPlayers) {
    const playerIndex = Math.floor(Math.random() * totalPlayers);
    const player = players[playerIndex];
    const playerId = player.name.replace(/#/gi, "_");
    if (!playersWithInfo[playerId]) {
      playersWithInfo[playerId] = {
        playerId,
        playerName: player.name,
        randomness: Math.floor(Math.random() * (1000 - 500 + 1) + 500),
      };
    }
  }
  return { rounds, players: playersWithInfo, playersCount: selectedPlayers };
};

export default function useInitialiseTournament() {
  const allPlayers = useSelector((state) => state.user.users);
  console.log("allPlayers", allPlayers);
  const [players, setPlayers] = useState(initialData());
  let noOfRounds = Math.log2(initialData().length);
  return { noOfRounds, players, setPlayers };
}
