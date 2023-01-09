import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

export default function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');
  const [column, setColumn] = useState('population');
  const [range, setRange] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filters, setFilters] = useState([]);
  const [filtersColumn, setFiltersColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [newFilters, setNewFilters] = useState([]);
  const [newPlanets, setNewPlanets] = useState([]);

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
    filters,
    setFilters,
    filtersColumn,
    setFiltersColumn,
    newFilters,
    setNewFilters,
    newPlanets,
    setNewPlanets,
  }), [planets, searchPlanet, column, range,
    number, filters, filtersColumn, newFilters, newPlanets]);

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
