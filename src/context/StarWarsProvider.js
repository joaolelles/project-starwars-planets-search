import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

export default function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');

  const value = useMemo(() => ({
    planets,
    setPlanets,
    searchPlanet,
    setSearchPlanet,
  }), [planets, searchPlanet]);

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
