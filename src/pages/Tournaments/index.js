import styles from "../../components/Accordion/style.module.css";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Col,
  Row,
  Table,
  useAccordionButton,
} from "react-bootstrap";
import expand from "../../assets/icons/expand.svg";
import close from "../../assets/icons/close.svg";
import CommonHeading from "../../components/Heading";
import CommonInput from "../../components/Input";
import { TournamentHeader } from "../../components/SubHeader";
import CommonTable from "../../components/Table";
import { Round2 } from "../../components/round";
import { useLocation } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { roundsRef } from "../../services/firebase";
import CommonAccordion from "../../components/Accordion";

const GetTournamentRounds = () => {
  const [rounds, setRounds] = useState([]);
  const location = useLocation();
  const { id, name } = location.state;
  useEffect(() => {
    return onSnapshot(roundsRef(id), (snapshot) => {
      let arr = [];
      snapshot.docs.map((doc) => arr.push({ id: doc.id, ...doc.data() }));
      setRounds(arr);
    });
  }, [id]);
  // console.log(rounds, 'check rounds')

  let restIndex =
    rounds.length > rounds.length - 5 ? rounds.length - 5 : rounds.length;
  let restOfAllWinners = rounds.slice(0, restIndex);
  let TTWinners = rounds.slice(restIndex);
  console.log("tt winners", TTWinners);
  return (
    <>
      <TournamentHeader title={name} id={id} />
      <div className="game-info" style={{ width: "95%", margin: "auto" }}>
        {restOfAllWinners.map((entry, index) => {
          return <CommonAccordion counter={false} key={index} data={entry} />;
        })}
        {TTWinners.length > 0 && (
          <CommonAccordion counter={false} TTWinners={TTWinners} />
        )}
      </div>
    </>
  );
};
function CustomToggle({ children, eventKey }) {
  const [src, setSrc] = useState(expand);
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setSrc(close);
    if (src === close) setSrc(expand);
  });

  return (
    <button type="button" onClick={decoratedOnClick} className={styles.icon}>
      <img src={src} alt="" />
    </button>
  );
}

export default GetTournamentRounds;
