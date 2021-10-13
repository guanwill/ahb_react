import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import SearchGames from './searchGames';
import * as axios from 'axios';
jest.mock('axios');

describe('searchGames', () => {
    beforeEach(() => {
        render(<SearchGames />);
    });
    it('returns a list of games', async () => {
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
        axios.post.mockImplementation(() => Promise.resolve(mockResponse));

        const searchInput = (await screen.getByPlaceholderText('Title')) as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'mario' } });
        expect(searchInput.value).toBe('mario');

        const submitButton = await screen.getByRole('button', { name: 'Search' });
        fireEvent.click(submitButton);

        await screen.findByText(mockGameDescription);
    });
});
