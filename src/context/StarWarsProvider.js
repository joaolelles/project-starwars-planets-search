import React, { useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

export default function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

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
