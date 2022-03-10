import React, { useEffect, useState } from "react";
import { Accordion, Card, Col, Row, Table, useAccordionButton } from "react-bootstrap";
import styles from "./style.module.css";
import expand from "../../assets/icons/expand.svg";
import close from "../../assets/icons/close.svg";
import CommonHeading from "../Heading";
import CommonInput from "../Input";
import CommonTable from "../Table";
import { Round2 } from "../round";

const CommonAccordion = ({ data, counter, TTWinners,showData }) => {
  const [searchValue, setSearchValue] = useState('')
  let saveData = data?.matches ?? []
  if (!!searchValue) {
    saveData = data.matches?.filter((v) => {
      return v.player1?.id == searchValue || v.player2?.id == searchValue
    })
  }
  return (
    <>
      <Accordion className={styles.myaccordion}>
        <h1 className={styles.timer}>25 : 20</h1>
        <Card className={styles.card}>
          <Card.Header className={styles.cardHeader}>
            <Row className={styles.row}>
              <Col md={3} className={styles.firstCol}>
                <CommonHeading
                  title={saveData?.name ?? 'FinalRound'}
                  size="30px"
                  barWidth="80%"
                  barMargin="-23px"
                />
              </Col>
              <Col md={6} className={styles.secondCol} > {!TTWinners && <CommonInput searchValue={searchValue} setSearchValue={setSearchValue} />} </Col>
              <Col md={3} className={styles.thirdCol} > <CustomToggle eventKey="0" /></Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={styles.cardBody} >
              {TTWinners && <Round2 rounds={TTWinners} />}
              {saveData.length > 0 && <Row className={styles.tableRow}>
                <Col md={3}></Col>
                <Col md={6}>
                  <Table className={styles.table} striped bordered hover>
                    <CommonTable data={saveData} />
                  </Table>
                </Col>
                <Col md={3}></Col>
              </Row>}

              {showData && 
              <>
                <h3>Result will display soon...</h3>
                <p>Lorem Ipsum is simply dummy text of the printing <br /> and typesetting industry.</p>
              </>
              }            </Card.Body>
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
