import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';
import fetchTablePlanets from '../services/planets';

export default function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const setPlanetsOnState = async () => {
    setPlanets(await fetchTablePlanets());
  };

  useEffect(() => {
    setPlanetsOnState();
  }, []);

  const value = {
    planets,
    setPlanets,
  };

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
