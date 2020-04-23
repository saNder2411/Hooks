import React, {useState, useEffect, useCallback, useMemo} from 'react';
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

const getPlanet = (id) => (
  fetch(`https://swapi.dev/api/planets/${id}`)
    .then((res) => res.json())
    .then((data) => data)
);

const useRequest = (request) => {
  const initialState = useMemo(() => ({
    data: null,
    loading: true,
    error: null,
  }), []);
  const [dataState, setDataState] = useState(initialState);

  useEffect(() => {
    setDataState(initialState);
    let cancelled = false;
    request()
      .then((data) => !cancelled && setDataState({
        data,
        loading: false,
        error: null,
      }))
      .catch((error) => !cancelled && setDataState({
        data: null,
        loading: false,
        error,
      }))

    return () => {
      cancelled = true;
    };
  }, [request, initialState]);

  return dataState;
};

const usePlanetInfo = (id) => {
  const request = useCallback(() => getPlanet(id), [id]);

  return useRequest(request);
};

const PlanetInfo = ({id}) => {
  const {data, loading, error} = usePlanetInfo(id);

  if (error) {
    return <div><p>Something is wrong!</p></div>
  }

  if (loading) {
    return <div><p>Loading...</p></div>
  }

  return (
    <div>
      <p>{id} - Planet Name: {data && data.name}</p>
    </div>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));
