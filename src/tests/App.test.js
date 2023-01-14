import React from 'react';
import { findAllByAltText, render, screen } from '@testing-library/react';
import App from '../App';
import StarWarsProvider from '../context/StarWarsProvider';
import userEvent from '@testing-library/user-event';
import testData from './mock';
import { act } from 'react-dom/test-utils';

describe('Testando table', () => {
  it('testando os inputs', () => {
    render(<StarWarsProvider><App /></StarWarsProvider>);
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();
    userEvent.type(nameInput, 'test');

    const numberInput = screen.getByTestId('value-filter');
    expect(numberInput).toBeInTheDocument();
    userEvent.type(numberInput, '00');
  })
  it ('testando fecth e os filtros', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    act(() => {
      render(<StarWarsProvider><App /></StarWarsProvider>);
    })
    const planet = await screen.findByText('Hoth');
    expect(planet).toBeInTheDocument();

    const nameInput = screen.getByTestId('name-filter');
    const numberInput = screen.getByTestId('value-filter');
    const coluna = screen.getByTestId('column-filter');
    const range = screen.getByTestId('comparison-filter');
    const btnPesquisar = screen.getByTestId('button-filter');

    userEvent.type(nameInput, 'a');
    userEvent.type(numberInput, '8');
    userEvent.selectOptions(coluna, 'surface_water');
    userEvent.selectOptions(range, 'igual a');
    userEvent.click(btnPesquisar);

    const planets = await screen.findByText('Yavin IV');
    
    expect(planets).toBeInTheDocument();
  })
})
