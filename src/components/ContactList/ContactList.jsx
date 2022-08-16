import PropTypes from 'prop-types';
import React from 'react';
import s from './ContactList.module.css';

export default function ContactList({ contacts, filter, onClick }) {
  const filtredContactList = contacts.filter(contact => {
    const name = contact.name.toLowerCase();
    return name.includes(filter.toLowerCase());
  });

  return (
    <ul className={s.list}>
      {filtredContactList.map(contact => {
        return <Contact key={contact.id} contact={contact} onClick={onClick} />;
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};

function Contact({ contact: { id, name, number }, onClick }) {
  return (
    <li id={id} className={s.item}>
      <p>
        {name}: {number}
      </p>
      <button className={s.button} type="button" onClick={onClick}>
        Delete
      </button>
    </li>
  );
}

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
