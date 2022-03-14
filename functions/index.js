const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const tournamentRef = admin.firestore().collection("tournaments");
const userRef = admin.database().ref("/nft/users");
const traitsRef = admin.database().ref("/nft/traits");
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.createTournaments = functions.https.onCall(async (_, context) => {
  try {
    //   tournament
    let tournamentName = "Tournament ";
    let no = 1;
    const last = await tournamentRef
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();
    if (!last.empty) {
      let lastTournament = last.docs[0].data();
      if (lastTournament.status === "active")
        return {
          success: false,
          message: "Tournament already running",
        };
      else {
        no = lastTournament.no + 1;
      }
    } else {
      no = 1;
    }
    tournamentName = "Tournament " + no;

    const users = (await userRef.once("value")).val();
    const { rounds, players, playersCount } = initialData(Object.values(users));
    const tournament = tournamentRef.doc();
    const created = new Date();
    let data = await tournament.set({
      id: tournament.id,
      rounds,
      no,
      players,
      playersCount,
      name: tournamentName,
      currentRound: 1,
      status: "active",
      createdAt: created.getTime(),
      updatedAt: created.getTime(),
    });

    const roundsRef = tournament.collection("rounds");
    try {
      await checkRound(roundsRef, rounds, players);
    } catch (error) {
      console.log(error);
    }
    functions.logger.info("Hello logs!", tournamentName);
    return {
      data,
      success: true,
      message: "Tournament created",
    };
  } catch (error) {
    return error;
  }
  // setTimeout(() => {
  //   functions.logger.info("Hello logs!2");
  // }, 5000);
  //   response.send("Hello from Firebase!");
});
const checkRound = async (roundsRef, totalRounds, players = {}) => {
  const rounds = await roundsRef.get();
  const completeRounds = rounds.docs.length ?? 0;
  let addTime = 30;
  const currentRound = completeRounds + 1;

  const roundRef = roundsRef.doc(`${currentRound}`);
  // let matches = []
  if (completeRounds > 0) {
    const prevRound = await roundsRef.doc(`${completeRounds}`).get();
    const { matches, winners } = await matchPlayers(players);
    // matches = matchData

    functions.logger.info(
      matches.length,
      "winners",
      Object.keys(winners).length
    );
    roundsRef.doc(`${completeRounds}`).update(
      {
        matches,
      },
      {
        merge: true,
      }
    );
    players = winners;
    if (completeRounds === totalRounds) {
      roundsRef.parent.update(
        {
          status: "finished",
          winner: matches[0].result,
          updatedAt: Date.now(),
        },
        {
          merge: true,
        }
      );
      return false;
    }
    // functions.logger.info("prevRound", prevRound.exists, currentRound);
    // players = players.slice(players.length / 2);
  }
  roundsRef.parent.update(
    {
      currentRound,
      updatedAt: Date.now(),
    },
    {
      merge: true,
    }
  );
  if (totalRounds - completeRounds <= 5) {
    addTime = 10;
  }
  const created = new Date();
  await roundRef.set({
    round: currentRound,
    totalRounds,
    addTime,
    players,
    matches: [],
    createdAt: created.getTime(),
    endAt: new Date(created.getTime() + addTime * 1000).getTime(),
  });

  if (currentRound <= totalRounds)
    setTimeout(async () => {
      checkRound(roundsRef, totalRounds, players);
    }, (currentRound === 1 ? addTime - 3 : addTime) * 1000);
  else {
    roundsRef.parent.update(
      {
        status: "finished",
        updatedAt: Date.now(),
      },
      {
        merge: true,
      }
    );
  }
};
// exports.createTournaments = functions.firestore
//   .document("/tournaments/{tournamentId}/")
//   .onCreate(async (snap, context) => {
//     const { tournaments, users } = snap.data();
//     functions.logger.info("Hello logs!", { structuredData: true });
//     console.log('data')
//     // const tournamentName = "Tournament " + (tournaments.length + 1);
//     // const { players, playersCount, rounds } = initialData(users);
//     // return snap.ref.set(
//     //   {
//     //     tournamentName,
//     //     players,
//     //     playersCount,
//     //     rounds,
//     //   },
//     //   { merge: true }
//     // );
//   });

const matchPlayers = async (players) => {
  const playersKeys = Object.keys(players);
  const totalPlayers = playersKeys.length;
  const loopOver = Math.floor(totalPlayers / 2);
  const matches = [];
  const winners = {};
  const traitsData = (await traitsRef.once("value")).val();
  const traits = await modifyTraits(traitsData);
  // functions.logger.info(traits, "result");
  for (let i = 0; i < loopOver; i++) {
    let player1, player2, player1Id, player2Id;
    if (totalPlayers > 32) {
      player1Id = playersKeys[i];
      player2Id = playersKeys[totalPlayers - i - 1];
    } else {
      let ind = i * 2;
      // functions.logger.info(ind, playersKeys.length);
      player1Id = playersKeys[ind];
      player2Id = playersKeys[ind + 1];
    }
    player1 = players[player1Id];
    player2 = players[player2Id];

    let { winner } = await fight({ player1, player2, traits });
    // functions.logger.info(result, winner, "result");
    matches.push({
      player1,
      player2,
      result: winner,
    });
    winners[winner.playerId] = winner;
  }
  // functions.logger.info("after loop");
  return {
    matches,
    winners,
  };
};

// fight between two players
const fight = async ({ player1, player2, traits }) => {
  const player1Info = (await userRef.child(player1.playerId).get()).val();
  const player2Info = (await userRef.child(player2.playerId).get()).val();
  const player1Score = await calculateScore({
    player: player1Info,
    ...player1,
    traits,
  });
  const player2Score = await calculateScore({
    player: player2Info,
    ...player2,
    traits,
  });
  // functions.logger.info(player1Traits, player2Traits, "traits");

  return {
    winner: player1Score > player2Score ? player1 : player2,
    // winner:  player2,
  };
};
// calculating total score
const calculateScore = async ({ player, traits, randomness }) => {
  const playerTraits = await calculateTraits({ player, traits });
  const playerLevel = player.attributes.find(
    (a) => a.trait_type.toLowerCase() === "level"
  ) || { value: 0 };
  const level = playerLevel.value / 100;
  randomness = randomness / 1000;
  const score = (playerTraits + level) * randomness;
  return score;
};
// calculate traits for each player
const calculateTraits = async ({ player, traits }) => {
  let traitBoost = 1;
  let totalTraits = player.attributes.length;
  let sumOfTraits = player.attributes.reduce((acc, curr) => {
    // parent trait like background ;
    const parentKey = curr.trait_type.replace(/\s/gi, "_");
    let parent = traits[parentKey];
    // child trait like Underworld Dusk
    const child = curr.value.trim().replace(/\./gi, "-");
    // console.log(parent.key, child, parent.traits[child]);
    let value = parent.traits[child] || 0;
    let amount = (1 - value / parent.total) * traitBoost;
    return acc + amount;
  }, 0);
  return sumOfTraits / totalTraits;
};
// modify traits data to our format :)
const modifyTraits = async (traits) => {
  return Object.keys(traits).reduce((acc, trait) => {
    let [key, ...trait_value] = trait.split("-");
    key = key.trim();
    trait_value = trait_value.join("-").trim();
    let value = acc[key] || {
      key,
      traits: {},
      count: 0,
      total: 0,
    };
    value.count++;
    value.total += traits[trait];
    value.traits[trait_value] = traits[trait];
    return {
      ...acc,
      [value.key]: value,
    };
  }, {});
};

const initialData = (players) => {
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
  return {
    rounds,
    players: playersWithInfo,
    playersCount: selectedPlayers,
  };
};
