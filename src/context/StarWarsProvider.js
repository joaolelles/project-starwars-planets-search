import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

export default function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');
  const [column, setColumn] = useState('population');
  const [range, setRange] = useState('maior que');
  const [number, setNumber] = useState(0);

  const value = useMemo(() => ({
    planets,
    setPlanets,
    searchPlanet,
    setSearchPlanet,
    column,
    setColumn,
    range,
    setRange,
    number,
    setNumber,
  }), [planets, searchPlanet, column, range, number]);

  return (
    <starWarsContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </starWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = ({
  children: PropTypes.node.isRequired,
});
