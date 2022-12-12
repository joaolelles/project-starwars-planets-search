import React, { useContext, useEffect } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const { setPlanets, planets,
    searchPlanet, setSearchPlanet } = useContext(starWarsContext);
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
    // console.log(fetchTablePlanets());
    fetchTablePlanets();
  }, [setPlanets]);

  // Referência do delete:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete#:~:text=The%20delete%20operator%20removes%20a,property%20is%20eventually%20released%20automatically.

  // const handleFilter = () => {
  //   const filteredPlanets = planets.filter((planet) => planet.name.toLowerCase()
  //     .incluedes(searchPlanet.toLowerCase()));
  //   return filteredPlanets;
  // };

  console.log(searchPlanet);

  return (
    <div>
      <input
        type="text"
        name="search"
        data-testid="name-filter"
        value={ searchPlanet }
        onChange={ (e) => setSearchPlanet(e.target.value) }
      />
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
