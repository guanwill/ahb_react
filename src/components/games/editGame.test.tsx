import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import render from '../../test-utils';
import EditGame from './editGame';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { useParams } from 'react-router-dom';

jest.mock('../../helpers/isTokenExpired', () => () => false);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));
const mockUserIdParam = '12345';
const mockGameIdParam = 'coolgame';
const mockUseParams = useParams as jest.Mocked<any>;
const userIdParams = { user_id: mockUserIdParam, game_id: mockGameIdParam };
mockUseParams.mockImplementation(() => userIdParams);

describe('EditGame', () => {
    let history;
    const gameTitle = 'mario to update';
    const platform = 'Playstation';
    const status = 'Playing';

    const initialState = {
        userGames: {
            games: [
                {
                    comments: undefined,
                    genre: undefined,
                    platform: platform,
                    rating: undefined,
                    release_date: undefined,
                    review: undefined,
                    status: status,
                    title: gameTitle,
                    _id: mockGameIdParam
                }
            ],
            message: ''
        }
    };

    beforeEach(() => {
        history = createMemoryHistory();

        render(
            <Router history={history}>
                <EditGame />
            </Router>,
            {
                initialState: initialState
            }
        );
    });

    it('should call axios with the correct arguments', async () => {
        const axiosSpy = jest
            .spyOn(axios, 'post')
            .mockImplementationOnce(() => Promise.resolve({ data: { message: 'Game updated' } })); // api always returns a message

        const titleInput = (await screen.getByPlaceholderText('Title')) as HTMLInputElement;
        expect(titleInput.value).toBe(gameTitle);

        const platformDropdown = (await screen.getByTestId('platform')) as HTMLInputElement;
        expect(platformDropdown.value).toBe(platform);

        const statusDropdown = (await screen.getByTestId('status')) as HTMLInputElement;
        expect(statusDropdown.value).toBe(status);

        const updatedTitle = 'mario is now updated';
        const updatedPlatform = 'Switch';
        userEvent.clear(titleInput);
        userEvent.type(titleInput, updatedTitle);
        expect(titleInput.value).toBe(updatedTitle);
        userEvent.selectOptions(platformDropdown, updatedPlatform);
        expect(platformDropdown.value).toBe(updatedPlatform);

        const updateButton = await screen.getByRole('button', { name: 'Update Game' });
        userEvent.click(updateButton);

        const mockApiGamePayload = {
            comments: undefined,
            genre: '',
            platform: updatedPlatform,
            rating: 0,
            release_date: '2021-10-17',
            review: undefined,
            status: status,
            title: updatedTitle
        };

        await waitFor(() => {
            expect(axiosSpy.mock.calls[0][1]).toEqual(mockApiGamePayload);
            expect(history.location.pathname).toEqual(`/user/${mockUserIdParam}/games`);
        });
    });
});
