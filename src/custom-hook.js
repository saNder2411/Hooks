import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>
        <button onClick={() => setValue((prevValue) => ++prevValue)}>+</button>
        <button onClick={() => setValue((prevValue) => --prevValue)}>-</button>
        <button onClick={() => setVisible(false)}>Hide</button>
        <PlanetInfo id={value}/>
      </div>
    );
  }

  return <button onClick={() => setVisible(true)}>Show</button>;
};

const usePlanetInfo = (id) => {
  const [planetName, setPlanetName] = useState(``);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://swapi.dev/api/planets/${id}`)
      .then((res) => res.json())
      .then((data) => !cancelled && setPlanetName(data.name))

    return () => {
      cancelled = true;
    };
  }, [id]);

  return planetName;

};

const PlanetInfo = ({id}) => {

  const planetName = usePlanetInfo(id);

  return (
    <div>
      <p>{id} - Planet Name: {planetName}</p>
    </div>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));
