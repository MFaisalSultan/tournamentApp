import React from 'react'
import TournamentLists from '../../components/TournamentList'
import CommonHeading from '../../components/Heading'
import { useSelector } from 'react-redux'

const History = () => {
  const getTournaments = useSelector(s=>s.user.tournaments)
  console.log(getTournaments,'my tournaments')
  return (
    <TournamentLists data={getTournaments} />

  )
}

export default History