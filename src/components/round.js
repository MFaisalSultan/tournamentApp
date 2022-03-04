import React from "react";
import "./round.css";

const round = ({ rounds }) => {
  console.log(rounds, "my winners");
  let lastIndex = round.length - 1;
  return (
    <div className="container">
      <div className="split split-one">
        {rounds.slice(0, 5).map((v, i) => {
          let getTotalValue = v.matches.length / 2 + 1;
          let matches = v.matches.slice(0, getTotalValue);
          console.log(i, getTotalValue, "parent index");
          return (
            <div className={`round round-${i + 1} current`}>
              {matches.map((value, ind) => {
                // console.log(ind, "checko");
                return (
                  <ul className="matchup">
                    <li className="team team-top">
                      {value.player1.name}
                      <span className="score">{value.player1.id}</span>
                    </li>
                    <li className="team team-bottom">
                      {value.player2.name}
                      <span className="score">{value.player2.id}</span>
                    </li>
                  </ul>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="champion">
        <div className="round round-six">
          <ul className="matchup">
            <li className="team team-bottom">
              {round[lastIndex] && round[lastIndex].matches[0].result.name}
              <span className="score">
                {round[lastIndex] && round[lastIndex].matches[0].result.id}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="split split-two">
        {rounds
          .slice(0, 5)
          .reverse()
          .map((v, i) => {
            let getTotalValue = v.matches.length / 2;
            return (
              <div className={`round round-${5 - i} current`}>
                {v.matches.slice(getTotalValue).map((value) => {
                  return (
                    <ul className="matchup">
                      <li className="team team-top">
                        {value.player1.name}
                        {/* <span className="score">{value.player1.id}</span> */}
                      </li>
                      <li className="team team-bottom">
                        {value.player2.name}
                        {/* <span className="score">{value.player2.id}</span> */}
                      </li>
                    </ul>
                  );
                })}
              </div>
            );
          })}
      </div>
      {/* <div className="champion">
        <div className="round round-six">
          <ul className="matchup">
            <li className="team team-bottom">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="split split-two">
        <div className="round round-five">
          <ul className="matchup">
            <li className="team team-bottom">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
          </ul>
        </div>

        <div className="round round-four">
          <ul className="matchup">
            <li className="team team-top">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
            <li className="team team-bottom">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
          </ul>
        </div>

        <div className="round round-three">
          <ul className="matchup">
            <li className="team team-top">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
            <li className="team team-bottom">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
            <li className="team team-bottom">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
          </ul>
        </div>

        <div className="round round-two">
          <ul className="matchup">
            <li className="team team-top">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
            <li className="team team-bottom">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
            <li className="team team-bottom">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
            <li className="team team-bottom">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
            <li className="team team-bottom">
              &nbsp;<span className="score">&nbsp;</span>
            </li>
          </ul>
        </div>
        <div className="round round-one current">
          <ul className="matchup">
            <li className="team team-top">
              Minnesota<span className="score">62</span>
            </li>
            <li className="team team-bottom">
              Northwestern<span className="score">54</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              Michigan<span className="score">68</span>
            </li>
            <li className="team team-bottom">
              Iowa<span className="score">66</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              Illinois<span className="score">64</span>
            </li>
            <li className="team team-bottom">
              Wisconsin<span className="score">56</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              Purdue<span className="score">36</span>
            </li>
            <li className="team team-bottom">
              Boise State<span className="score">40</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              Penn State<span className="score">38</span>
            </li>
            <li className="team team-bottom">
              Indiana<span className="score">44</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              Ohio State<span className="score">52</span>
            </li>
            <li className="team team-bottom">
              VCU<span className="score">80</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              USC<span className="score">58</span>
            </li>
            <li className="team team-bottom">
              Cal<span className="score">59</span>
            </li>
          </ul>
          <ul className="matchup">
            <li className="team team-top">
              Virginia Tech<span className="score">74</span>
            </li>
            <li className="team team-bottom">
              Dartmouth<span className="score">111</span>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};
export const Round2 = ({ rounds: prevRounds }) => {
  const rounds = Array.from(new Array(6));
  const lastIndex = rounds.length - 1;
  console.log(prevRounds,'perv rounds')
  // let spliTwoArr = [];
  return (
    <section id="bracket" style={{marginTop:'2rem'}}>
      <div className="container">
        <div className="split split-one">
          {rounds.slice(0, 5).map((_, ind, { length: parentLength }) => {
            let noItems = ind === 4 ? 1 : Math.pow(2, 3 - ind);
            let item = prevRounds[ind] ?? { name: "null ", matches: [] };
            // console.log(noItems);
            // item.matches = item.matches.sort((a,b)=> a.player1.id !== b.player1.id ? a.player1.id - b.player1.id : a.player2.id - b.player2.id)
            return (
              <div
                className={`round round-${ind + 1}  ${
                  !!prevRounds[ind] && "current"
                }`}
              >
                {Array.from(new Array(noItems)).map(
                  (v, childInd, { length: childLength }) => {
                    let childItem = item.matches[childInd] ?? {
                      player1: null,
                      player2: null,
                      result: null,
                    };
                    return (
                      <ul className="matchup">
                        <li
                          className="team team-top"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {childItem.player1?.name}
                          <span className="score">
                            {childItem.player1?.id}{" "}
                          </span>
                        </li>
                        {!(
                          parentLength - 1 === ind &&
                          childLength - 1 === childInd
                        ) && (
                          <li
                            className="team team-bottom"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {childItem.player2?.name}&nbsp;
                            <span className="score">
                              {" "}
                              &nbsp; {childItem.player2?.id}
                            </span>
                          </li>
                        )}
                      </ul>
                    );
                  }
                )}
              </div>
            );
          })}
        </div>

        {prevRounds.slice(lastIndex).map((v, i) => {
          return (
            <div className="champion">
              <div className="round round-six">
                <ul className="matchup">
                  <li className="team team-bottom">
                    {v.matches[0].result?.name}
                    <span className="score">{v.matches[0].result?.id}</span>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}

        <div className="split split-two">
          {rounds.slice(0, 5).map((_, ind, { length: parentLength }) => {
            let noItems = ind === 0 ? 1 : Math.pow(2, ind - 1);
            let itemIndex = 4 - ind;
            // console.log(itemIndex);
            let item = prevRounds[itemIndex] ?? { name: "null ", matches: [] };
            // item.matches = item.matches.sort((a,b)=> a.player1.id -b.player1.id )

            return (
              <div className={`round round-${5 - ind}  current`}>
                {Array.from(new Array(noItems)).map(
                  (v, childInd, { length: childLength }) => {
                    let itemInd = item.matches.length - 1 - childInd;
                    let childItem = item.matches[itemInd] ?? {
                      player1: null,
                      player2: null,
                      result: null,
                    };
                    // console.log(childInd, item.matches.length, "childitem");
                    return (
                      <ul className="matchup">
                        <li
                          className="team team-top"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {childItem.player1?.name}
                          <span className="score">{childItem.player1?.id}</span>
                        </li>
                        {!(0 === ind && 0 === childInd) && (
                          <li
                            className="team team-bottom"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {childItem.player2?.name}
                            <span className="score">
                              {childItem.player2?.id}
                            </span>
                          </li>
                        )}
                      </ul>
                    );
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export const Round3 = () => {
  return (
    <section id="bracket">
      <div className="container">
        <div className="split split-one">
          <div className="round round-one current">
            <ul className="matchup">
              <li className="team team-top">
                Duke<span className="score">76</span>
              </li>
              <li className="team team-bottom">
                Virginia<span className="score">82</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Wake Forest<span className="score">64</span>
              </li>
              <li className="team team-bottom">
                Clemson<span className="score">56</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                North Carolina<span className="score">68</span>
              </li>
              <li className="team team-bottom">
                Florida State<span className="score">54</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                NC State<span className="score">74</span>
              </li>
              <li className="team team-bottom">
                Maryland<span className="score">92</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Georgia Tech<span className="score">78</span>
              </li>
              <li className="team team-bottom">
                Georgia<span className="score">80</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Auburn<span className="score">64</span>
              </li>
              <li className="team team-bottom">
                Florida<span className="score">63</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Kentucky<span className="score">70</span>
              </li>
              <li className="team team-bottom">
                Alabama<span className="score">59</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Vanderbilt<span className="score">64</span>
              </li>
              <li className="team team-bottom">
                Gonzaga<span className="score">68</span>
              </li>
            </ul>
          </div>

          <div className="round round-two">
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
          </div>

          <div className="round round-three">
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
          </div>
          <div className="round round-four">
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
          </div>
          <div className="round round-five">
            <ul className="matchup">
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
          </div>
          {/* <div className="round round-four">
                            <ul className="matchup">
                                <li className="team team-bottom">&nbsp;<span className="score">&nbsp;</span></li>
                            </ul>
                            <ul className="matchup">
                                <li className="team team-bottom">&nbsp;<span className="score">&nbsp;</span></li>
                            </ul>
                        </div> */}
        </div>

        <div className="champion">
          <div className="round round-six">
            <ul className="matchup">
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="split split-two">
          <div className="round round-five">
            <ul className="matchup">
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
          </div>

          <div className="round round-four">
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
          </div>

          <div className="round round-three">
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
          </div>

          <div className="round round-two">
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
              <li className="team team-bottom">
                &nbsp;<span className="score">&nbsp;</span>
              </li>
            </ul>
          </div>
          <div className="round round-one current">
            <ul className="matchup">
              <li className="team team-top">
                Minnesota<span className="score">62</span>
              </li>
              <li className="team team-bottom">
                Northwestern<span className="score">54</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Michigan<span className="score">68</span>
              </li>
              <li className="team team-bottom">
                Iowa<span className="score">66</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Illinois<span className="score">64</span>
              </li>
              <li className="team team-bottom">
                Wisconsin<span className="score">56</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Purdue<span className="score">36</span>
              </li>
              <li className="team team-bottom">
                Boise State<span className="score">40</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Penn State<span className="score">38</span>
              </li>
              <li className="team team-bottom">
                Indiana<span className="score">44</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Ohio State<span className="score">52</span>
              </li>
              <li className="team team-bottom">
                VCU<span className="score">80</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                USC<span className="score">58</span>
              </li>
              <li className="team team-bottom">
                Cal<span className="score">59</span>
              </li>
            </ul>
            <ul className="matchup">
              <li className="team team-top">
                Virginia Tech<span className="score">74</span>
              </li>
              <li className="team team-bottom">
                Dartmouth<span className="score">111</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default round;
