const Persons = ({ people }) => 
    people.map((person) => 
      <p> {person.name} {person.number}</p>
)

export default Persons 