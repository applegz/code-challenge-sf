import './App.css';
import React from 'react';
import scores from './scores';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: 0,
    };
  }

  render() {
    console.log(scores[0]);
    return (
      <div className="App">
        <form>
          <label htmlFor="candidateId">
            Please enter the candidate id (e.g. 123) here to see their
            percentiles
          </label>
          <input
            type="search"
            id="candidateId"
            name="candidateId"
            placeholder=" candidate id"
            required
            pattern="\d{3}"
          ></input>
          <input type="submit" value="Submit"></input>
        </form>
        <div className="results">
          <h2>Results</h2>
          <div>{this.state.scores}</div>
        </div>
      </div>
    );
  }
}

export default App;
