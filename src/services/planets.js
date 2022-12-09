const fetchTablePlanets = async () => {
  const endPoint = 'https://swapi.dev/api/planets';
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export default fetchTablePlanets;
