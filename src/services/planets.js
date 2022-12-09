/* eslint-disable import/prefer-default-export */
export const fetchTablePlanets = async () => {
  const endPoint = 'https://swapi.dev/api/planets';
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};
