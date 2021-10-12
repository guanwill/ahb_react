import React from 'react';
import HomePage from './index';
import { screen } from '@testing-library/react';
import render from '../../test-utils';

jest.mock('./searchGames', () => () => <div>Search games</div>);

describe('index', () => {
    beforeEach(() => {
        render(<HomePage />);
    });
    it('render search bar and new games list', () => {
        screen.getByText('Search games');
    });
});
