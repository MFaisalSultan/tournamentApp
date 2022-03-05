import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import versus from '../../assets/icons/versus.svg'
import styles from './style.module.css'
import medal from '../../assets/icons/medal.svg'

const CommonTable = ({ data }) => {
    console.log(data, 'data in table')
    return (
        data && data.map((match, index) => {
            return (
                <tr className={styles.tableRow}>
                    <td className={styles.firstCol} style={{background:match?.player1?.id === match?.result?.id ?'#c8252a' :'#000'}} >Fighter # {match?.player1?.id}<img src={medal} /> </td>
                    <td className={styles.secondCol} ><img src={versus} /></td>
                    <td className={styles.thirdCol} style={{background:match?.player2?.id === match?.result?.id ?'#4ec9ff' :'#000'}} > <img src={medal} /> Fighter # {match?.player2?.id}</td>
                </tr>

            )
        })
    )
}

export default CommonTable