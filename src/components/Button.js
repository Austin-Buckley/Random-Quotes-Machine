import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

function Button({ buttonDisplayName, onClick }) {
  return (
    <button className="btn btn-block btn-primary" onClick={onClick}>
      <FontAwesomeIcon icon={faQuoteLeft} /> 
        <strong><em>{" " + buttonDisplayName + " "}</em></strong>
      <FontAwesomeIcon icon={faQuoteRight} />
    </button>
  );
};

export default Button;