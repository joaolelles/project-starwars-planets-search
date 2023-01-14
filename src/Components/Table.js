import React, { useContext, useEffect } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const { setPlanets, planets,
    searchPlanet, setSearchPlanet, column, setColumn,
    range, setRange, number, setNumber, filters, setFilters,
    filtersColumn, setFiltersColumn, newFilters, setNewFilters,
    newPlanets, setNewPlanets,
  } = useContext(starWarsContext);

  useEffect(() => {
    const fetchTablePlanets = async () => {
      try {
        const endPoint = 'https://swapi.dev/api/planets';
        const response = await fetch(endPoint);
        const data = await response.json();
        const planetsList = data.results;
        const deleteResidents = planetsList.map((planet) => {
          delete planet.residents;
          return planet;
        });
        setNewPlanets(deleteResidents);
        setPlanets(deleteResidents);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTablePlanets();
  }, [setNewPlanets, setPlanets]);

  useEffect(() => {
    filters.forEach((filter) => {
      if (filter.range === 'maior que') {
        const numFilter = newPlanets.filter(
          (planet) => (Number(planet[filter.column]) > Number(filter.number)),
        );
        setNewPlanets(numFilter);
      }
      if (filter.range === 'menor que') {
        const numFilter = newPlanets.filter(
          (planet) => (Number(planet[filter.column]) < Number(filter.number)),
        );
        setNewPlanets(numFilter);
      }
      if (filter.range === 'igual a') {
        const numFilter = newPlanets.filter(
          (planet) => (Number(planet[filter.column]) === Number(filter.number)),
        );
        setNewPlanets(numFilter);
      }
    });
  }, [filters]);

  const handleFiltersNum = () => {
    if (range === 'maior que') {
      const numFilter = newPlanets.filter(
        (planet) => (Number(planet[column]) > Number(number)),
      );
      setNewPlanets(numFilter);
    }
    if (range === 'menor que') {
      const numFilter = newPlanets.filter(
        (planet) => (Number(planet[column]) < Number(number)),
      );
      setNewPlanets(numFilter);
    }
    if (range === 'igual a') {
      const numFilter = newPlanets.filter(
        (planet) => (Number(planet[column]) === Number(number)),
      );
      setNewPlanets(numFilter);
    }
    const object = { column, range, number };
    setFilters([...filters, object]);
    const noRepeatFilters = filtersColumn.filter((filter) => filter !== column);
    setFiltersColumn(noRepeatFilters);
    setColumn(noRepeatFilters[0]);
    setNewFilters([...newFilters, column]);
  };

  const deleteSingleFilter = (item) => {
    const returnFilters = filters.filter((el) => el.column !== item);
    const deleteFilter = newFilters.filter((del) => del !== item);
    setNewFilters(deleteFilter);
    setFiltersColumn([...filtersColumn, item]);
    setFilters(returnFilters);
    setNewPlanets(planets);
  };

  const removeAllFilters = () => {
    setNewPlanets(planets);
    setNewFilters([]);
    setFiltersColumn([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="search"
          data-testid="name-filter"
          value={ searchPlanet }
          onChange={ (e) => setSearchPlanet(e.target.value) }
        />
        <select
          name="column"
          data-testid="column-filter"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
        >
          {filtersColumn.map((option, index) => (
            <option key={ index } value={ option }>
              {option}
            </option>
          ))}
        </select>
        <select
          name="range"
          data-testid="comparison-filter"
          value={ range }
          onChange={ (e) => setRange(e.target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          name="number"
          data-testid="value-filter"
          value={ number }
          onChange={ (e) => setNumber(e.target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFiltersNum }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover todas filtragens
        </button>
      </form>
      { newFilters.map((arg) => (
        <p key={ arg } data-testid="filter">
          {`${arg}`}
          <button
            type="button"
            data-testid="delete-filter"
            onClick={ () => deleteSingleFilter(arg) }
          >
            x
          </button>
        </p>
      ))}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {newPlanets
            .filter((planet) => (planet.name.toLowerCase()
              .includes(searchPlanet.toLowerCase())))
            .map((planet, index) => (
              <tr key={ index }>
                <th>{planet.name}</th>
                <th>{planet.rotation_period}</th>
                <th>{planet.orbital_period}</th>
                <th>{planet.diameter}</th>
                <th>{planet.climate}</th>
                <th>{planet.gravity}</th>
                <th>{planet.terrain}</th>
                <th>{planet.surface_water}</th>
                <th>{planet.population}</th>
                <th>{planet.films}</th>
                <th>{planet.created}</th>
                <th>{planet.edited}</th>
                <th>{planet.url}</th>
              </tr>
            ))}
          ;
        </tbody>
      </table>
    </div>
  );
}

export default Table;
