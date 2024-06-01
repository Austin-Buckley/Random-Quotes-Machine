import { Button, Card, CardActions, CardContent, Fade, IconButton } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Quote from './Quote';
import React from 'react';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    transition: 'background-color 1000ms ease-in-out, color 1000ms ease-in-out',
  }
}

function QuoteMachine({ backgroundColor, textColor, selectedQuote, randomizeQuote }) {
  const { quote, author } = selectedQuote;
  const hashtag = author ? `${author.replace(/\s+/g, '')}` : '';
  const tweet = `https://twitter.com/intent/tweet?text="${quote}"%0A%0A-&hashtags=${hashtag}`;

  return (
    <Fade in={true} timeout={800}>
      <Card className="quote-card">
        <CardContent>
          <Quote color={textColor} quote={selectedQuote} />
        </CardContent>
        <CardActions className="actions">
          <IconButton size="medium" href={tweet} target="_blank" id="tweet-quote" button>
            <FontAwesomeIcon className="icon" color={backgroundColor} size="md" icon={faTwitter} />
          </IconButton>
          <Button size="medium" onClick={randomizeQuote} id="new-quote" button>
            <FontAwesomeIcon className="icon" color={backgroundColor} size="md" icon={faRandom} />
          </Button>
        </CardActions>
      </Card>
    </Fade>
  );
}

export default withStyles(styles)(QuoteMachine);