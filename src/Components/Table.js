import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const { planets } = useContext(starWarsContext);

  const planetInfos = planets;
  console.log(planetInfos);
  return (
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
        { planetInfos.map((planet, index) => (
          <tr key={ index }>
            <th>{planet.Name}</th>
            <th>{planet.Rotation_Period}</th>
            <th>{planet.Orbital_Period}</th>
            <th>{planet.Diameter}</th>
            <th>{planet.Climate}</th>
            <th>{planet.Gravity}</th>
            <th>{planet.Terrain}</th>
            <th>{planet.Surface_Water}</th>
            <th>{planet.Population}</th>
            <th>{planet.Films}</th>
            <th>{planet.Created}</th>
            <th>{planet.Edited}</th>
            <th>{planet.url}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
