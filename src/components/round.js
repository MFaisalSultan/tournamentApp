import React from "react";
import "./round.css";

export const Round2 = ({ rounds: prevRounds }) => {
  const rounds = Array.from(new Array(5));
  const lastIndex = rounds.length - 1;
  console.log(prevRounds, "perv rounds");
  // let spliTwoArr = [];
  return (
    <section id="bracket">
      <div className="container">
        <div className="split split-one">
          {rounds.slice(0, 4).map((_, ind, { length: parentLength }) => {
            let noItems = ind === 3 ? 1 : Math.pow(2, 3 - ind);
            let item = prevRounds[ind] ?? { name: "null ", matches: [] };
            console.log("loop", noItems, ind, item);

            return (
              <div
                className={`round round-${ind + 1}  ${
                  !!prevRounds[ind] && item.matches.length > 0 && "current"
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
                          className="team team-top first-team"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor:
                              childItem.player1?.playerId ===
                              childItem.result?.playerId
                                ? "#c8252a"
                                : "#000",
                          }}
                        >
                          <span className="score">
                            {childItem.player1?.playerName}
                          </span>
                        </li>
                        {!(
                          parentLength - 1 === ind &&
                          childLength - 1 === childInd
                        ) && (
                          <li
                            className="team team-bottom first-team"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              backgroundColor:
                                childItem.player2?.playerId ===
                                childItem.result?.playerId
                                  ? "#c8252a"
                                  : "#000",
                            }}
                          >
                            <span className="score">
                              {" "}
                              {childItem.player2?.playerName}
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

        <div className="champion">
          <p>WINNER</p>
          <div className="round round-six">
            <ul className="matchup" style={{padding:'0'}}>
              {prevRounds.slice(lastIndex).length > 0 ? (
                prevRounds.slice(lastIndex).map((v, i) => {
                  return (
                    <li className="team team-bottom win-team">
                      <span className="score">
                        {v.matches[0]?.result?.playerName}
                      </span>
                    </li>
                  );
                })
              ) : (
                <li
                  className="team team-bottom win-team"
                  style={{
                    backgroundColor: "#000",
                  }}
                >
                  <span className="score"></span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="split split-two">
          {rounds.slice(0, 4).map((_, ind, { length: parentLength }) => {
            let noItems = ind === 0 ? 1 : Math.pow(2, ind );
            let itemIndex = 3 - ind;

            let item = prevRounds[itemIndex] ?? { name: "null ", matches: [] };
            console.log("loop", noItems, ind, itemIndex, item);

            // item.matches = item.matches.sort((a,b)=> a.player1.id -b.player1.id )

            return (
              <div
                className={`round round-${4 - ind} ${
                  !!prevRounds[itemIndex] &&
                  item.matches.length > 0 &&
                  "current"
                }`}
              >
                {Array.from(new Array(noItems)).map(
                  (v, childInd, { length: childLength }) => {
                    let itemInd = item.matches.length - 1 - childInd;
                    let childItem = item.matches[itemInd] ?? {
                      player1: null,
                      player2: null,
                      result: null,
                    };
                    console.log(
                      "item length",
                      item.matches.length,
                      "item index",
                      childInd
                    );
                    {
                      /* console.log(itemInd, childItem); */
                    }
                    return (
                      <ul className="matchup">
                        <li
                          className="team team-top second-team"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor:
                              childItem.player1?.playerId ===
                              childItem.result?.playerId
                                ? "#4ec9ff"
                                : "#000",
                          }}
                        >
                          <span className="score">
                            {childItem.player1?.playerName}
                          </span>
                        </li>
                        {!(0 === ind && 0 === childInd) && (
                          <li
                            className="team team-bottom second-team"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              backgroundColor:
                                childItem.player2?.playerId ===
                                childItem.result?.playerId
                                  ? "#4ec9ff"
                                  : "#000",
                            }}
                          >
                            <span className="score">
                              {childItem.player2?.playerName}
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
