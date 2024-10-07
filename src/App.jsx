import Input from "./components/Input";
import { useState } from "react";
import { calculateInvestmentResults } from "./util/investment";
import TableRow from "./components/TableRow";
import waitingPng from "./assets/waiting-image.png";

const INITIAL_STATE = {};
let results;

function App() {
  const [inputs, setInputs] = useState(INITIAL_STATE);
  const { initialInvestment, annualInvestment, expectedReturn, duration } =
    inputs;
  let isInputValid;
  if (initialInvestment && annualInvestment && expectedReturn && duration) {
    results = calculateInvestmentResults(inputs);
    if (duration > 0) isInputValid = true;
  }
  return (
    <>
      <section id="user-input">
        <div className="input-group">
          <Input
            labelName="initial investment"
            inputValues={inputs}
            onValueChange={setInputs}
          />
          <Input
            labelName="annual investment"
            inputValues={inputs}
            onValueChange={setInputs}
          />
        </div>
        <div className="input-group">
          <Input
            labelName="expected return"
            inputValues={inputs}
            onValueChange={setInputs}
          />
          <Input
            labelName="duration"
            inputValues={inputs}
            onValueChange={setInputs}
          />
        </div>
      </section>

      {isInputValid ? (
        <table id="result" className="center">
          <thead>
            <tr>
              <td>Year</td>
              <td>Investmment Value</td>
              <td>Interest(Year)</td>
              <td>Total Interest</td>
              <td>Invested Capital</td>
            </tr>
          </thead>
          <tbody>
            {results &&
              results.map((row, index) => {
                if (index === 0) {
                  row.totalInterest = row.interest;
                } else {
                  row.totalInterest =
                    results[index - 1].totalInterest + row.interest;
                }
                return <TableRow key={row.year} row={row} />;
              })}
          </tbody>
        </table>
      ) : (
        // <p className="center">Please provide Valid Investment details</p>
        //<div className="load-positioner"><div id="loader"></div>Waiting for input</div>
        <div className="image-container">
          <img src={waitingPng} alt="image"/>
          <p>Waiting for input</p>
        </div>
      )}
    </>
  );
}

export default App;
