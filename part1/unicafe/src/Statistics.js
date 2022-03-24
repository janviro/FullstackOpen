import StatisticLine from './StatisticLine'

const Statistics = ({goodVotes, neutralVotes, badVotes}) => {
  const allVotes = () => goodVotes + neutralVotes + badVotes;
  const average = () => (goodVotes - badVotes) / allVotes();
  const positive = () => goodVotes / allVotes();

  if (allVotes() > 0) {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <StatisticLine text="good" votes={goodVotes}/>
          <StatisticLine text="neutral" votes={neutralVotes}/>
          <StatisticLine text="bad" votes={badVotes}/>
          <StatisticLine text="all" votes={allVotes()}/>
          <StatisticLine text="average" votes={average()}/>
          <StatisticLine text="positive" votes={positive()}/>
        </table>
          
      </div>)
  } else {
    return (
      <p>No feedback given.</p>
    )
  }
}

export default Statistics