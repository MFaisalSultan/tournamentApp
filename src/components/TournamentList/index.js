import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import styles from './style.module.css'

const TournamentLists = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.main}>
            {
                data && data.map((v, i) => {
                    console.log(v,'my v')
                    const handleClick = () =>{
                        navigate(`/tournament/${v.id}`,{state:v});
                    }
                  return  <div className={styles.headingParent} key={i}>
                        <h1 className={styles.heading}>{v.name}</h1>
                        <button className={styles.link} onClick={handleClick}  >View</button>
                    </div>
                })
            }
        </div>

    )
}

export default TournamentLists