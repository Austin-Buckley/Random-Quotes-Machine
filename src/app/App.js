import './App.css';
import Button from '../components/Button.js';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      author: '',
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  };

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
     .then(response => response.json())
     .then(data => {
        this.setState({
          quotes: data,
        });
      })
     .catch(error => {
        console.log(error);
      });
  };


  handleButtonClick = () => {
    console.log('Button clicked!');
    console.log(this.state.quotes);
  };

  render() {
    return (
      <div className="App" id="quote-box">
        <Button buttonDisplayName="Randomize Quote" onClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default App;
