import { initializeApp } from "firebase/app";
import {
  getDatabase,
  onChildAdded,
  ref,
  set,
  onChildChanged,
  get,
  onChildRemoved,
} from "firebase/database";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  onSnapshot,
  limit,
  where,
  orderBy,
} from "firebase/firestore";
// functions stuff
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBDvf7nYHY5hzfHStI971Vre3aY7-O3Zgs",
//   authDomain: "saving-app-ecae3.firebaseapp.com",
//   databaseURL: "https://saving-app-ecae3-default-rtdb.firebaseio.com",
//   projectId: "saving-app-ecae3",
//   storageBucket: "saving-app-ecae3.appspot.com",
//   messagingSenderId: "984327145354",
//   appId: "1:984327145354:web:b0d300807b607d3e95ea73",
//   measurementId: "G-97LW2QP0QY",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBv2IM3qVNBJErV3iaiLfdz9G4_UnqHsgc",
  authDomain: "nft-tournament-app.firebaseapp.com",
  projectId: "nft-tournament-app",
  storageBucket: "nft-tournament-app.appspot.com",
  messagingSenderId: "149698728069",
  appId: "1:149698728069:web:99f7c430267198796d99ec",
  measurementId: "G-DJF6FVTWJ2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const fStore = getFirestore(app);
const userRef = ref(db, "/users");
// tournamentRef 
const tournamentsRef = collection(fStore, "tournaments");
// firebase firestore tournament's round Ref 
const roundsRef = (tournament_id) =>
  collection(doc(tournamentsRef, tournament_id), "rounds");
const tournamentId = (id) => doc(tournamentsRef, id);
const setTournament = (id, data) => setDoc(tournamentId(id), data);
export const tournamentQuery = query(
  tournamentsRef,
  where("status", "==", "finished"),
  orderBy("no", "desc")
);
export const lastTournamentQuery = query(
  tournamentsRef,
  where("status", "==", "active"),
  orderBy("no", "desc"),
  limit(1)
);
// export const roundsQuery = (tournament_id) =>
//   query(
//     roundsRef,
//     where("status", "==", "active"),
//     orderBy("updatedAt", "desc"),
//     limit(1)
//   );
export const loadTournaments = async () => {
  const tournaments = await getDocs(tournamentQuery);
  return tournaments.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
// const tournamentsRef = ref(db, "/tournaments");
const userId = (id) => ref(db, `/users/${id}`);
export {
  db,
  app,
  onChildAdded,
  onSnapshot,
  roundsRef,
  onChildChanged,
  onChildRemoved,
  userRef,
  tournamentsRef,
  userId,
  get,
  ref,
  setTournament,
  set,
};

const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);
export const creatingTournament = httpsCallable(functions, "createTournaments");
