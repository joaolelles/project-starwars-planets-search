import { useContext } from 'react';

const { setPlanets } = useContext(starWarsContext);

const fetchTablePlanets = async () => {
  const endPoint = 'https://swapi.dev/api/planets';
  const response = await fetch(endPoint);
  const data = await response.json();
  const planets = data.results;
  const deleteResidents = planets.map((planet) => {
    delete planet.residents;
    return planet;
  });
  setPlanets(deleteResidents);
};

// Referência do delete:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete#:~:text=The%20delete%20operator%20removes%20a,property%20is%20eventually%20released%20automatically.

export default fetchTablePlanets;
