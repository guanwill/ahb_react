import React from 'react';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import SearchGames from './searchGames';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

describe('searchGames', () => {
    beforeEach(() => {
        render(<SearchGames />);
    });

    it('returns a list of searched game results for the public', async () => {
        const mockGameDescription = 'Super Mario is the best of the best of the best';
        const mockResponse = {
            data: {
                data: {
                    searchGames: [
                        {
                            deck: mockGameDescription,
                            id: '11111',
                            image: { icon_url: '' },
                            name: 'Super Mario 3D',
                            original_release_date: '2020-09-18',
                            platforms: [{ name: 'Nintendo Switch' }],
                            site_detail_url: 'blah'
                        }
                    ]
                }
            }
        };

        // @ts-ignore
        jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.resolve(mockResponse));

        const searchInput = (await screen.getByPlaceholderText('Title')) as HTMLInputElement;
        userEvent.type(searchInput, 'mario');
        expect(searchInput.value).toBe('mario');

        const submitButton = await screen.getByRole('button', { name: 'Search' });
        userEvent.click(submitButton);

        await screen.findByText(mockGameDescription);
    });
});
