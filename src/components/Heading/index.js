import React, { useState } from "react";
import CommonModal from "../Modal";
import styles from "./style.module.css";

const CommonHeading = ({ title, icon, size,barWidth,barMargin }) => {
  const [show, setShow] = useState(false);
  const handleClick = () =>{
    setShow(true)
  }
  return (
    <>
    <div className={styles.main}>
      <div className={styles.headingParent}>
        <h1 style={{ fontSize: size }} className={styles.heading}> {title}</h1>
        <img src={icon} onClick={handleClick} />
      </div>
      <div style={{width:barWidth,marginLeft:barMargin}} className={styles.bar}></div>
    </div>
    <CommonModal show={show} setShow={setShow} />
    </>
  );
};

export default CommonHeading;
