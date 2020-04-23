import React, {Component, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>
        <button onClick={() => setValue((prevValue) => ++prevValue)}>+</button>
        <button onClick={() => setValue((prevValue) => --prevValue)}>-</button>
        <button onClick={() => setVisible(false)}>Hide</button>
        <HookCounter value={value} />
        <ClassCounter value={value} />
        <Notification />
      </div>
    );
  }

  return <button onClick={() => setVisible(true)}>Show</button>;
};

const HookCounter = ({value}) => {


  useEffect(() => {
    console.log(`useEffect(): mount`);

    return () => console.log(`useEffect(): unmount(clear)`);
  }, []);

  useEffect(() => console.log(`useEffect(): update`));

  return <p>Hook counter: {value}</p>;
};

const Notification = () => {

  const [visible, setVisible] = useState(true);

  useEffect(() => {
   const delay = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(delay);
  }, []);

  return <div>{visible && <p>Hello</p>}</div>;
};

class ClassCounter extends Component {

  componentDidMount() {
    console.log(`class: did mount`);
  }

  componentDidUpdate(props) {
    console.log(`class: did update, prevProps: ${props.value}`);
  }

  componentWillUnmount() {
    console.log(`class: will unmount`);
  }

  render() {
    return <p>Class counter: {this.props.value}</p>;
  }
}



ReactDOM.render(<App />, document.getElementById('root'));
