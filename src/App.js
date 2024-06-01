import './App.css';
import 'typeface-roboto';

import { Grid, withStyles } from '@material-ui/core';

import QuoteMachine from './components/QuoteMachine.js';
import React from 'react';
import { random } from 'lodash';

const styles = {
  container: {
    alignItems: 'center',
    textAlign: 'center',
    height: '100vh',
    transition: 'background-color 1000ms ease-in-out, color 1000ms ease-in-out, height 1000ms ease-in-out',
  }
}

const QUOTES_DATABASE = 'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      currentQuoteIndex: null,
      backgroundColor: '#282c34',
    };

    this.selectRandomQuoteIndex = this.selectRandomQuoteIndex.bind(this);
    this.randomizeQuote = this.randomizeQuote.bind(this);
  };

  componentDidMount() {
    fetch(QUOTES_DATABASE)
      .then(response => response.json())
      .then(quotes => this.setState({quotes}, this.randomizeQuote))
      .catch(error => {
        console.log(error);
      });
    };
    
    randomizeQuote = () => {
      const colors = [
        '#282c34', // dark blue-gray
        '#ff6347', // tomato red
        '#4682b4', // steel blue
        '#b0c4de', // light steel blue
        '#ff8c00', // dark orange
        '#9932cc', // dark orchid
        '#008000', // green
        '#00ced1'  // dark turquoise
      ];
      const currentColor = this.state.backgroundColor; 
      
      let randomColor;
      do {
        randomColor = colors[Math.floor(Math.random() * colors.length)];
      } while (randomColor === currentColor); 
      
      this.setState({
        currentQuoteIndex: this.selectRandomQuoteIndex(),
        backgroundColor: randomColor,
       });
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
    const grid = this.props.classes.container += " container";
    const { backgroundColor } = this.state;
    const colorStyle = { backgroundColor, color: backgroundColor };
    
    return (
      <Grid className={grid} justifyContent="center" id="quote-box" container 
        style={colorStyle}>
        <Grid xs={11} lg={8} item>
          <QuoteMachine 
            className="QuoteMachine" 
            colorStyle={colorStyle.color} 
            selectedQuote={this.selectedQuote} 
            randomizeQuote={this.randomizeQuote} 
            />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
