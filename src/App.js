import React from 'react';
import Table from './Components/Table';
import StarWarsProvider from './context/StarWarsProvider';
import './App.css';

function App() {
  return (
    <StarWarsProvider>
      <div>
        <Table />
      </div>
    </StarWarsProvider>
  );
}

export default App;
