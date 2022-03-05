import React from 'react'
import { Col, Row, Button, Container } from 'react-bootstrap'
import info from '../../assets/icons/info.svg'
import styles from './style.module.css'
import CommonHeading from '../Heading'
import moment from 'moment'

const SubHeader = () => {
  let date = moment().utc(true).format('hh:A z, D MMMM YYYY ')

  return (
    <Container fluid>
      <Row className={styles.row}>
        <Col md={3}><Button className={styles.button}>History</Button></Col>
        <Col md={6}><CommonHeading title="Tournament # 7" icon={info} /></Col>
        <Col md={3}><p className={styles.date} > {date}</p></Col>
      </Row>
    </Container>
  )
}

export default SubHeader