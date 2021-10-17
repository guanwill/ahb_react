import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import render from '../../test-utils';
import AddGame from './addGame';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// jest.mock('../../helpers/isTokenExpired', () => () => false);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));
const mockUserIdParam = '12345';
const mockUseParams = useParams as jest.Mocked<any>;
const userIdParams = { user_id: mockUserIdParam };
mockUseParams.mockImplementation(() => userIdParams);

describe('AddGame', () => {
    let history;

    beforeEach(() => {
        history = createBrowserHistory();

        render(
            <Router history={history}>
                <AddGame />
            </Router>
        );
    });

    it('should call callAddGameApi actions', async () => {
        const gameTitle = 'mario oh mario';
        const platform = 'Playstation';
        const status = 'Playing';

        const axiosSpy = jest
            .spyOn(axios, 'post')
            .mockImplementationOnce(() => Promise.resolve({ data: { message: 'Game added' } })); // api always returns a message

        const titleInput = (await screen.getByPlaceholderText('Title')) as HTMLInputElement;
        userEvent.type(titleInput, gameTitle);
        expect(titleInput.value).toBe(gameTitle);

        const platformDropdown = (await screen.getByTestId('platform')) as HTMLInputElement;
        userEvent.selectOptions(platformDropdown, platform);
        expect(platformDropdown.value).toBe(platform);

        const statusDropdown = (await screen.getByTestId('status')) as HTMLInputElement;
        userEvent.selectOptions(statusDropdown, status);
        expect(statusDropdown.value).toBe(status);

        const addButton = await screen.getByRole('button', { name: 'Add Game' });
        userEvent.click(addButton);

        const mockApiGamePayload = {
            comments: undefined,
            genre: undefined,
            platform: platform,
            rating: undefined,
            release_date: undefined,
            review: undefined,
            status: status,
            title: gameTitle
        };

        await waitFor(() => {
            expect(axiosSpy.mock.calls[0][1]).toEqual(mockApiGamePayload);
            expect(history.location.pathname).toEqual(`/user/${mockUserIdParam}/games`);
        });
    });
});
