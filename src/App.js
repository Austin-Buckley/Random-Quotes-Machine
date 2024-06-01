import './App.css';
import 'typeface-roboto';

import { Grid, withStyles } from '@material-ui/core';

import Colors from './components/Colors';
import QuoteMachine from './components/QuoteMachine.js';
import React from 'react';
import { random } from 'lodash';

const styles = {
  container: {
    alignItems: 'center',
    textAlign: 'center',
    height: '100vh',
    transition: 'background-color 1000ms ease-in-out, color 1000ms ease-in-out,height 500ms ease-in-out'
  }
}

const QUOTES_DATABASE = 'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      currentQuoteIndex: null,
      backgroundColor: null,
      currentColor: null,
      textColor: 'white'
    };

    this.selectRandomQuoteIndex = this.selectRandomQuoteIndex.bind(this);
    this.randomizeQuote = this.randomizeQuote.bind(this);
    this.randomColor = this.randomColor.bind(this);
  };

  componentDidMount() {
    fetch(QUOTES_DATABASE)
      .then(response => response.json())
      .then(quotes => this.setState({quotes}, this.randomizeQuote))
      .catch(error => {
        console.log(error);
      });
    };
    
    randomColor = () => Colors[Math.floor(Math.random() * Colors.length)];
    
    randomizeQuote = () => {
      let randomColor;
      do {
        randomColor = this.randomColor();
      } while (randomColor === this.currentColor); 
      
      this.currentColor = randomColor; 
      
      this.setState({
        backgroundColor: this.currentColor,
        currentColor: this.backgroundColor,
        textColor: 'white'
      });
      
      setTimeout(() => {
      this.setState({
        currentQuoteIndex: this.selectRandomQuoteIndex(),
        currentColor: this.currentColor,
        textColor: this.currentColor,
        });
      }, 1000);
    };

    selectRandomQuoteIndex = () => {
      if (!this.state.quotes.length) {
        return null;
      }
      return random(0, this.state.quotes.length - 1);
    }
    
    get selectedQuote() {
      if (!this.state.quotes.length || !Number.isInteger(this.state.currentQuoteIndex)) {
        return '';
      }
      return this.state.quotes[this.state.currentQuoteIndex];
    }

    render() {
    const grid = this.props.classes.container += " quote-container";
    const { backgroundColor, textColor } = this.state;
    const colorStyle = { backgroundColor, color: textColor };
    
    return (
      <Grid className={grid} justifyContent="center" id="quote-box" container 
        style={colorStyle}>
        <Grid xs={11} lg={5}  className="grid" item>
          <QuoteMachine 
            className="QuoteMachine" 
            backgroundColor={backgroundColor}
            textColor={textColor}
            selectedQuote={this.selectedQuote} 
            randomizeQuote={this.randomizeQuote} 
            />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
