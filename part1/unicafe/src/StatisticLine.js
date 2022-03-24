const StatisticLine = ({text, votes}) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{votes}</td>
      </tr>
    )
  }
  
  export default StatisticLine