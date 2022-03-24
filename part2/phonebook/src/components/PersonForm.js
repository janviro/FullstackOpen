const PersonForm = ({addPerson, changeName, changeNumber, newName, newNumber}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={changeName}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={changeNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm