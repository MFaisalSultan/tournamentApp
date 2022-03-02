import React from 'react'
import './round.css'

const round = ({player1,player2}) => {
    return (
                          <>
                    <div class="split split-one">
                        <div class="round round-one current">
                            <ul class="matchup">
                                <li class="team team-top">Duke<span class="score">76</span></li>
                                <li class="team team-bottom">Virginia<span class="score">82</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Wake Forest<span class="score">64</span></li>
                                <li class="team team-bottom">Clemson<span class="score">56</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">North Carolina<span class="score">68</span></li>
                                <li class="team team-bottom">Florida State<span class="score">54</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">NC State<span class="score">74</span></li>
                                <li class="team team-bottom">Maryland<span class="score">92</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Georgia Tech<span class="score">78</span></li>
                                <li class="team team-bottom">Georgia<span class="score">80</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Auburn<span class="score">64</span></li>
                                <li class="team team-bottom">Florida<span class="score">63</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Kentucky<span class="score">70</span></li>
                                <li class="team team-bottom">Alabama<span class="score">59</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Vanderbilt<span class="score">64</span></li>
                                <li class="team team-bottom">Gonzaga<span class="score">68</span></li>
                            </ul>
                        </div>

                        <div class="round round-two">
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>

                        <div class="round round-three">
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>
                        <div class="round round-four">
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>
                        <div class="round round-five">
                            <ul class="matchup">
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>
                        {/* <div class="round round-four">
                            <ul class="matchup">
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div> */}
                    </div>

                    <div class="champion">
                    <div class="round round-six">
                            <ul class="matchup">
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>

                    </div>


                    <div class="split split-two">
                    <div class="round round-five">
                            <ul class="matchup">
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>

                        <div class="round round-four">
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>

                        <div class="round round-three">
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>

                        <div class="round round-two">
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">&nbsp;<span class="score">&nbsp;</span></li>
                                <li class="team team-bottom">&nbsp;<span class="score">&nbsp;</span></li>
                            </ul>
                        </div>
                        <div class="round round-one current">
                            <ul class="matchup">
                                <li class="team team-top">Minnesota<span class="score">62</span></li>
                                <li class="team team-bottom">Northwestern<span class="score">54</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Michigan<span class="score">68</span></li>
                                <li class="team team-bottom">Iowa<span class="score">66</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Illinois<span class="score">64</span></li>
                                <li class="team team-bottom">Wisconsin<span class="score">56</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Purdue<span class="score">36</span></li>
                                <li class="team team-bottom">Boise State<span class="score">40</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Penn State<span class="score">38</span></li>
                                <li class="team team-bottom">Indiana<span class="score">44</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Ohio State<span class="score">52</span></li>
                                <li class="team team-bottom">VCU<span class="score">80</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">USC<span class="score">58</span></li>
                                <li class="team team-bottom">Cal<span class="score">59</span></li>
                            </ul>
                            <ul class="matchup">
                                <li class="team team-top">Virginia Tech<span class="score">74</span></li>
                                <li class="team team-bottom">Dartmouth<span class="score">111</span></li>
                            </ul>
                        </div>
                    </div>
                </>

    )
}

export default round