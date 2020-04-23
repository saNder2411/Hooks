import React, {useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {

  return (
    <React.Fragment>
      <HookSwitcher />
    </React.Fragment>
  );
};

const HookSwitcher = () => {
  const [color, setColor] = useState(`aqua`);
  const [fontSize, setFontSize] = useState(14);
  console.log(fontSize);

  return (
    <div style={{
        padding: `10px`,
        backgroundColor: color,
        fontSize: `${fontSize}px`,
        }}>
      Hello World!
      <button onClick={() => setColor(`gray`)}>
        Dark
      </button>
      <button onClick={() => setColor(`aqua`)}>
        Light
      </button>
      <button onClick={() => setFontSize((prevState) => prevState + 2)}>
        Font size +
      </button>
      <button onClick={() => setFontSize((prevState) => prevState - 2)}>
        Font size -
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
