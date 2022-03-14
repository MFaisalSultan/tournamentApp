import moment from "moment";
import React, { useEffect, useState } from "react";

function Counter({ round, id, createdAt, endAt, current }) {
  const [count, setCount] = useState("00:00");
  // if(round === current.round){
  //   console.log(cur)
  // }

  const timeFinish = Date.now() - endAt > 0;

  useEffect(() => {
    let myInterval = setInterval(() => {
      const now = moment();
      const endTime = moment(new Date(endAt));
      const difference = endTime.diff(now);
      const newTime = moment.utc(difference).format("mm:ss");
      // console.log();
      if (now.toDate().getTime() - endAt > 0) {
        console.log("clear");
        clearInterval(myInterval);
        setCount("00:00");
      }
      setCount(newTime);
    }, 1000);
    return () => {
      myInterval && clearInterval(myInterval);
    };
  }, [id]);
  if (timeFinish) {
    if (id === current.id) return <span> Loading...</span>;
    return <span>00:00</span>;
  }
  return <span> {count}</span>;
}

export default Counter;
