import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import versus from "../../assets/icons/versus.svg";
import styles from "./style.module.css";
import medal from "../../assets/icons/medal.svg";

const CommonTable = ({ data }) => {
  console.log(data, "data in table");
  let winner = (id, result) => {
    return id === result?.playerId;
  };
  return (
    data &&
    data.map((match, index) => {
      return (
        <tr key={index} className={styles.tableRow}>
          <td
            className={styles.firstCol}
            style={{
              background: winner(match?.player1?.playerId, match.result)
                ? "#c8252a"
                : "#000",
            }}
          >
            {match?.player1?.playerName}
            <img src={medal} />{" "}
          </td>
          <td className={styles.secondCol}>
            <img src={versus} />
          </td>
          <td
            className={styles.thirdCol}
            style={{
              background: winner(match?.player2?.playerId, match.result)
                ? "#4ec9ff"
                : "#000",
            }}
          >
            <img src={medal} />
            {match?.player2?.playerName}
          </td>
        </tr>
      );
    })
  );
};

export default CommonTable;
