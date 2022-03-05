import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./style.module.css";
import search from "../../assets/icons/search.svg";
import cross from "../../assets/icons/cross.svg";

const CommonInput = ({getValue,searchValue,setSearchValue}) => {
  const [image, setImage] = useState(search);
  const onChange = (e) => {
    setSearchValue(e.target.value)
    if (e.target.value !== "") setImage(cross);
    else setImage(search);
  };
  const onClick = () => {
    if (image === cross) {
      setSearchValue("");
      setImage(search);
    }
  };
  return (
    <div className={styles.main}>
      <Form.Control
        value={searchValue}
        onChange={onChange}
        className={styles.search}
        type="text"
        placeholder="E.g 23652"
      />
      <img
        className={searchValue !== "" ? styles.icon2 : styles.icon1}
        onClick={onClick}
        src={image}
      />
    </div>
  );
};

export default CommonInput;
