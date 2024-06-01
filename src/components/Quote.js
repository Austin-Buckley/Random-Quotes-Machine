import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Typography } from '@material-ui/core';

const SPACING = '   ';

function Quote({ color, quote }) {
  return (
      <Typography style={{color}} className="quote-container" id="text">
        <p className="quote">
          <FontAwesomeIcon className='quote icon' color={color} icon={faQuoteLeft} /> 
          {SPACING + quote.quote + SPACING}
          <FontAwesomeIcon className='quote icon' color={color} icon={faQuoteRight} />
        </p>
        <strong className="author" id="author"><em>-{quote.author}</em></strong>
      </Typography>
  );
}

export default Quote;