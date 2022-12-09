import React from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

export default function StarWarsProvider({ children }) {
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
