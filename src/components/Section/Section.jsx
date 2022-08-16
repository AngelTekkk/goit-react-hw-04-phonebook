import React from 'react';
import PropTypes from 'prop-types';
import s from './Section.module.css';

export default function Section({ children, title }) {
  return (
    <div className={s.section}>
      <h2 className={s.title}>{title}</h2>
      {children}
    </div>
  );
}

Section.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};
