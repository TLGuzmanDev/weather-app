import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Input = ({ onSubmit }) => {
  return (
    <form id="form" onSubmit={onSubmit}>
      <input type="text" name="locationInput" placeholder="LOCATION..."></input>
      <button type="submit">
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </button>
    </form>
  );
};

export default Input;
