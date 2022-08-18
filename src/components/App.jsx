import React, { useState } from 'react';
import { Notify } from 'notiflix';
import { nanoid } from 'nanoid';

import {
  Filter,
  ContactList,
  Section,
  ContactForm,
  useLocalStorage,
} from './index';

const INITIAL_CONTACT_LIST = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useLocalStorage(
    'contacts',
    INITIAL_CONTACT_LIST
  );
  const [filter, setFilter] = useState('');

  const handleChange = ({ target: { value } }) => {
    setFilter(value.trim());
  };

  const handleDelete = e => {
    const contactId = e.target.parentNode.id;
    const contactName = contacts.find(contact => contact.id === contactId).name;
    Notify.info(`${contactName} is deleted from contacts.`);
    setContacts(contacts => {
      return contacts.filter(contact => contact.id !== contactId);
    });
  };

  const handleAddContact = (name, number) => {
    console.log(name);
    console.log(contacts);
    const id = nanoid();
    const isNameAlreadyAdded = contacts.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
    const isNumberAlreadyAdded = contacts.find(c => c.number === number);

    if (isNameAlreadyAdded || isNumberAlreadyAdded) {
      isNameAlreadyAdded && Notify.failure(`${name} is already in contacts.`);
      isNumberAlreadyAdded &&
        Notify.failure(
          `${number} is already in contacts as ${isNumberAlreadyAdded.name}.`
        );
    } else {
      Notify.success(`${name} is added to contacts.`);
      setContacts(contacts => {
        return [...contacts, { id, name, number }];
      });
    }
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onAddContact={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <Filter onChange={handleChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onClick={handleDelete}
        />
      </Section>
    </>
  );
}
