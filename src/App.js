import './App.css';
import React from 'react';
import scores from './scores';

const fractalIndex = {
  1: 0.678,
  2: 0.782,
  3: 0.795,
  4: 0.724,
  5: 0.523,
};

function similarCo(companyId) {
  let res = [],
    curCoIdx = fractalIndex[companyId];
  for (let key in fractalIndex) {
    if (Math.abs(curCoIdx - fractalIndex[key]) < 0.15) res.push(Number(key));
  }
  return res;
}

function percentile(arr, val) {
  let num =
    (100 *
      arr.reduce(
        (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
        0
      )) /
    arr.length;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

//! needs to add error handling later
function percentileCalculation(candidateId) {
  let candidate = scores.find((ele) => ele.candidate_id === candidateId);
  if (candidate === undefined) return [null, null];
  let similarCos = similarCo(candidate.company_id);
  let similarCoData = scores.filter((ele) =>
    similarCos.includes(ele.company_id)
  );
  let codeArr = similarCoData
    .filter((ele) => ele.title === candidate.title)
    .map((ele) => (ele = ele.coding_score))
    .sort((a, b) => a - b);
  let commArr = similarCoData
    .filter((ele) => ele.title === candidate.title)
    .map((ele) => (ele = ele.communication_score));
  let codeP = percentile(codeArr, candidate.coding_score);
  let commP = percentile(commArr, candidate.communication_score);
  return [codeP, commP];
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateId: 0,
      codingP: 0,
      commP: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ candidateId: event.target.value });
  }

  handleSubmit(event) {
    let curCodingP = percentileCalculation(Number(this.state.candidateId))[0];
    let curCommP = percentileCalculation(Number(this.state.candidateId))[1];
    this.setState({ codingP: curCodingP });
    this.setState({ commP: curCommP });
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
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
            value={this.state.candidateId ? this.state.candidateId : ''}
            onChange={this.handleChange}
          ></input>
          <input type="submit" value="Submit"></input>
        </form>
        <div className="results">
          <h3>Results</h3>
          <div>
            {this.state.codingP === null
              ? `Cannot find this candidate, please try again.`
              : `Coding Percentile: ${this.state.codingP}%
            Communication Percentile: ${this.state.commP}%`}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
