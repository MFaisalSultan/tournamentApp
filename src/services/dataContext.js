import React, { createContext, useState, useEffect, useCallback } from "react";
import { onChildAdded, onChildChanged, db, userRef } from "./firebase";
const DataContext = createContext(null);

export { DataContext };

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    console.log(userRef, "userRef");
    let userAddListner = onChildAdded(
      userRef,
      (snapshot) => {
        const user = snapshot.val();
        console.log("users", user);
        setUsers((us) => ({ ...us, [snapshot.key]: user }));
        // setPlayers(prevPlayers => {
        //   return [...prevPlayers, data];
        // });
      },
      (err) => {
        console.log(err);
      }
    );
    let userChangeListner = onChildChanged(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("users update", data);
        // setPlayers(prevPlayers => {
        //   return [...prevPlayers, data];
        // });
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {
      userAddListner();
      userChangeListner();
    };
  }, []);
  return (
    <DataContext.Provider value={{ data, setData, users, setUsers }}>
      {children}
    </DataContext.Provider>
  );
};
