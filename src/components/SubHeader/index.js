import React from 'react'
import { Col, Row,Button, Container } from 'react-bootstrap'
import styles from './style.module.css'
import info from '../../assets/icons/info.svg'

const SubHeader = () => {
  return (
<Container fluid>
    <Row className={styles.row}>
        <Col><Button className={styles.button}>History</Button></Col>
        <Col><h1 className={styles.heading}> Tournament # 7 <span></span> <img src={info} alt="" /> </h1></Col>
        <Col><p>08 : PM UTC, 3 March 2022</p></Col>
    </Row>
</Container>
  )
}

export default SubHeader