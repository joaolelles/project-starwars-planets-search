import React, { useContext, useEffect } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const { setPlanets, planets,
    searchPlanet, setSearchPlanet, column, setColumn,
    range, setRange, number, setNumber, filters, setFilters,
    filtersColumn, setFiltersColumn, newFilters, setNewFilters,
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
        setPlanets(deleteResidents);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTablePlanets();
  }, [setPlanets]);

  // Referência do delete:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete#:~:text=The%20delete%20operator%20removes%20a,property%20is%20eventually%20released%20automatically.

  const handleFiltersNum = () => {
    if (range === 'maior que') {
      const numFilter = planets.filter(
        (planet) => (Number(planet[column]) > Number(number)),
      );
      setPlanets(numFilter);
    }
    if (range === 'menor que') {
      const numFilter = planets.filter(
        (planet) => (Number(planet[column]) < Number(number)),
      );
      setPlanets(numFilter);
    }
    if (range === 'igual a') {
      const numFilter = planets.filter(
        (planet) => (Number(planet[column]) === Number(number)),
      );
      setPlanets(numFilter);
    }
    const object = { column, range, number };
    setFilters([...filters, object]);
    const noRepeatFilters = filtersColumn.filter((filter) => filter !== column);
    setFiltersColumn(noRepeatFilters);
    setColumn(noRepeatFilters[0]);
    setNewFilters([...newFilters, column]);
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
        {/* <label></label> */}
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
      </form>
      { newFilters.map((arg) => (
        <p key={ arg }>
          {`${arg}`}
          <button
            type="button"
            data-testid="delete-filter"
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
          {planets
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
