import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Teste o componente `<App.js />`', () => {
  test('Aplicação contém um conjunto fixo de links de navegação.', () => {
    render(<App />, { wrapper: BrowserRouter });
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritesLink).toBeInTheDocument();
  });
  test('Redireciona p/ a pág inicial ao clicar no `Home` da barra de navegação.', () => {
    render(<App />, { wrapper: BrowserRouter });
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const h2 = screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });
  test('Redireciona p/ o About ao clicar no link `About` da barra de navegação.', () => {
    render(<App />, { wrapper: BrowserRouter });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const h2 = screen.getByRole('heading', { name: /about/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });
  test('Redireciona p/ a pág de `Favoritados`, ao clicar no `Favorite Pokémons`.', () => {
    render(<App />, { wrapper: BrowserRouter });
    const aboutFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(aboutFavorite);
    const h2 = screen.getByRole('heading', { name: /favorite pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Redireciona p/ a pág `Not Found` ao entrar em uma URL desconhecida.', () => {
    window.history.pushState({}, '', '/xablau');
    // forçando o site a ir para uma pagina desconhecida
    render(<App />, { wrapper: BrowserRouter });
    const h2 = screen.getByRole('heading',
      { name: /page requested not found/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });
});
