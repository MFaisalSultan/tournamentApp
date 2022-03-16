import React, { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Col,
  Row,
  Table,
  useAccordionButton,
} from "react-bootstrap";
import styles from "./style.module.css";
import expand from "../../assets/icons/expand.svg";
import close from "../../assets/icons/close.svg";
import CommonHeading from "../Heading";
import CommonInput from "../Input";
import CommonTable from "../Table";
import { Round2 } from "../round";
import Counter from "../Counter";

const CommonAccordion = ({ data, counter, TTWinners = [], round }) => {
  const [searchValue, setSearchValue] = useState("");
  let saveData = data?.matches ?? [];
  console.log(saveData, 'daa with save')

  if (!!searchValue) {
    saveData = data?.matches?.filter((v) => {
      let getIndexPlayer1 = v?.player1?.playerId?.indexOf('_') + 1
      let player1Id = v?.player1?.playerId?.slice(getIndexPlayer1)
      let getIndexPlayer2 = v?.player2?.playerId?.indexOf('_') + 1
      let player2Id = v?.player2?.playerId?.slice(getIndexPlayer2)
      return player1Id == searchValue || player2Id == searchValue;
    });
  }
  let showData =
    TTWinners.length > 0
      ? TTWinners[0]?.matches?.length === 0
      : data?.matches?.length === 0;
  let roundInfo = data ? data : TTWinners[TTWinners.length - 1];
  // console.log(round, "round");
  // const [done, setDone] = useState();
  return (
    <>
      <Accordion className={styles.myaccordion}>
        <h1 className={styles.timer}>
          {counter && <Counter {...roundInfo} current={round} />}
        </h1>
        <Card className={styles.card}>
          <Card.Header className={styles.cardHeader}>
            <Row className={styles.row}>
              <Col md={3} className={styles.firstCol}>
                <CommonHeading
                  title={
                    TTWinners.length > 0
                      ? "Final Round"
                      : "Round " + roundInfo.round
                  }
                  size="30px"
                  barWidth="80%"
                  barMargin="-23px"
                />
              </Col>
              <Col md={6} className={styles.secondCol}>
                {" "}
                {TTWinners.length === 0 && data && (
                  <CommonInput
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                )}{" "}
              </Col>
              <Col md={3} className={styles.thirdCol}>
                {" "}
                <CustomToggle eventKey="0" />
              </Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={styles.cardBody}>
              {TTWinners.length > 0 && TTWinners[0].matches.length > 0 && (
                <Round2 rounds={TTWinners} />
              )}
              {saveData.length > 0 && (
                <Row className={styles.tableRow}>
                  <Col md={3}></Col>
                  <Col md={6}>
                    <Table className={styles.table} striped bordered hover>
                      <CommonTable data={saveData} />
                    </Table>
                  </Col>
                  <Col md={3}></Col>
                </Row>
              )}
              {showData && (
                <>
                  <h3>Result will display soon...</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing <br /> and
                    typesetting industry.
                  </p>
                </>
              )}{" "}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
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

export default CommonAccordion;
