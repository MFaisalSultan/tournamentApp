import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  onChildAdded,
  onChildChanged,
  db,
  userRef,
  set,
  userId,
  get,
} from "../services/firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Game from "../components/game";
import Home from "./Home";
import History from "./History";
import { Round2, Round3 } from "../components/round";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { setUser, setUsers } from "../redux/user/userSlice";
import { sample } from "./data";

const Main = () => {
  const dispatch = useDispatch();
  const loadUser = useCallback(async () => {
    const users = await get(userRef);
    dispatch(setUsers(users.val()));
  }, []);
  useEffect(() => {
    loadUser();
    // setting nfts to firebase
    // Object.keys(sample).map((key) => {
    //   console.log(key, sample[key]);
    //   set(userId(key.replace(/#/ig,'_')), sample[key]);
    // });

    // let userAddListner = onChildAdded(
    //   userRef,
    //   (snapshot) => {
    //     const user = snapshot.val();
    //     dispatch(setUser({ key: snapshot.key, value: user }));
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    let userChangeListner = onChildChanged(
      userRef,
      (snapshot) => {
        const user = snapshot.val();
        dispatch(setUser({ key: snapshot.key, value: user }));
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {
      // userAddListner();
      userChangeListner();
    };
  }, []);
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/round" element={<Round3 />} />
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </Layout>
  );
};

export default Main;
