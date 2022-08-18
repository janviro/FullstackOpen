const Person = ({ person, deletePerson }) => {
    return (
        <>
            <p>
                {person.name} {person.number} 
                { } <button onClick={(e) => deletePerson(e, person.id, person.name)}>Delete person</button>
            </p>
        </>
    )
}

export default Person