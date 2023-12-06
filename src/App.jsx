import { useState, useEffect } from 'react';
import axios from 'axios'
import personService from './services/persons'
import Filter from './component/Filter.jsx';
import PersonForm from './component/PersonForm.jsx';
import Persons from './component/Persons.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchNumber, setFilterNumber] = useState('');
  const [newSearchNumber, setFilterNewNumber] = useState(persons);

  useEffect(() => {
    console.log('effect');
    personService.getAll().then(initialPersons => {
      console.log('promise fulfilled');
      setPersons(initialPersons);
    });
  }, []);
  console.log('render', persons.length, 'persons');

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      important: Math.random() > 0.5
    }
    
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
    });
  };

  const handleSearchChange = (event) => {
    const searchItem = event.target.value;
    setFilterNumber(searchItem);
    const filterNumber = persons.filter((person) =>
      person.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilterNewNumber(filterNumber);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchNumber} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleAdd}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons people={newSearchNumber} />
    </div>
  );
};

export default App;
