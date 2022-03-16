import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import info from "../../assets/icons/info.svg";
import styles from "./style.module.css";
import CommonHeading from "../Heading";
import moment from "moment";
import { useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";

const SubHeader = () => {
  let date = moment().utc(true).format("hh:A z, D MMMM YYYY ");
  const navigate = useNavigate()
  let tournament = useSelector((state) => state.user.tournament);
  let tournaments = useSelector((state) => state.user.tournaments);
  const location = useLocation()
  const checkHistory = location.pathname === '/history'
  const checkPath = location.pathname.slice(12)
  const filterPathname = tournaments.findIndex((v, i) => v.id === checkPath)
  const handleClick = () =>{
    navigate('/history')
  }
  return (
    <>
      {filterPathname === -1 &&
        <Container className={styles.container} fluid>
          <Row className={styles.row}>
            {!checkHistory && <Col md={3}>
              {checkHistory ? '' : <Button onClick={handleClick} className={styles.button}>History</Button>}
            </Col>}
            {checkHistory && <Col md={3}></Col>}
            <Col md={6}>
              {!!tournament || checkHistory && (
                <CommonHeading barWidth={checkHistory && '30%'} title={tournament?.name ?? "History"} icon={checkHistory ? '' : info} />
              )}
            </Col>
            <Col md={3}>
              <p className={styles.date}> {date}</p>
            </Col>
          </Row>
        </Container>
      } 
    </>
  );
};

export default SubHeader;

export const TournamentHeader = ({ title, id }) => {
  let date = moment().utc(true).format("hh:A z, D MMMM YYYY ");
  let tournament = useSelector((state) => state.user.tournament);
  const location = useLocation()
  const checkPath = location.pathname === `/tournament/${id}`
  console.log(location.pathname, 'check path')
  return (
    <Container className={styles.container} fluid>
      <Row className={styles.row}>
        <Col md={3}>
          {checkPath ? '' : <Button className={styles.button}>History</Button>}
        </Col>
        <Col md={6}>

          <CommonHeading title={title} icon={info} />
        </Col>
        <Col md={3}>
          <p className={styles.date}> {date}</p>
        </Col>
      </Row>
    </Container>
  );
};

