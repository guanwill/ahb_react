import React from 'react';
import { act, screen } from '@testing-library/react';
import render from '../../test-utils';
import NewGames from './newGames';
import axios from 'axios';

describe('NewGames', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('returns a list of new games for the public', async () => {
        const mockGameDescription = 'Super Mario is the best of the best of the best';
        const mockResponse = {
            data: {
                data: {
                    latestGames: [
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

        await act(async () => {
            await render(<NewGames />);
        });

        await screen.findByText(mockGameDescription);
    });
});
