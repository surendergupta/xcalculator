import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleCalculate = (e) => {
    e.preventDefault();
    try {
      if(input.length === 0) {
        throw new Error("Invalid calculation");
      }
      const evaluatedResult = evaluateExpression(input);
      setResult(evaluatedResult);
    } catch (error) {
      setResult("Error");
    }
  }

  const evaluateExpression = (expression) => {
    if (/[^0-9+\-*/().\s]/.test(expression)) {
      throw new Error("Invalid characters in the expression");
    }
    try {
      const result = new Function(`return ${expression}`)();
      if (isNaN(result)) {
        setResult(result);
        // throw new Error("Invalid calculation");
      }
      return result;
    } catch {
      throw new Error("Invalid calculation");
    }
  };

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <div className='calculator'>
        <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        <div id='result' className='result'>{result}</div>
        <div className='keypad'>
          <button onClick={() => setInput(input + '7')}>7</button>
          <button onClick={() => setInput(input + '8')}>8</button>
          <button onClick={() => setInput(input + '9')}>9</button>
          <button onClick={() => setInput(input + '+')}>+</button>
          <button onClick={() => setInput(input + '4')}>4</button>
          <button onClick={() => setInput(input + '5')}>5</button>
          <button onClick={() => setInput(input + '6')}>6</button>
          <button onClick={() => setInput(input + '-')}>-</button>
          <button onClick={() => setInput(input + '1')}>1</button>
          <button onClick={() => setInput(input + '2')}>2</button>
          <button onClick={() => setInput(input + '3')}>3</button>
          <button onClick={() => setInput(input + '*')}>*</button>
          <button onClick={() => { setInput(''); setResult(''); }}>C</button>
          <button onClick={() => setInput(input + '0') }>0</button>
          <button onClick={handleCalculate}>=</button>
          <button onClick={() => setInput(input + '/')}>/</button>
        </div>
      </div>
    </div>
  );
}

export default App;
