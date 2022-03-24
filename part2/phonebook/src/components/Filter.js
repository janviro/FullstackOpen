const Filter = ({filterText, filterPersons}) => {

  return (
    <p>filter shown with 
        <input onChange={filterPersons}/>
    </p>
      
  )
}

export default Filter