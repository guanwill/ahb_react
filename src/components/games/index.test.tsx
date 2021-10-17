import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import render from '../../test-utils';
import Games from './index';
import axios from 'axios';

jest.mock('../../helpers/isTokenExpired', () => () => false);

describe('Games', () => {
    it('should display list of user games', async () => {
        const mockResponse = {
            data: {
                data: {
                    games: [
                        {
                            comments: undefined,
                            genre: undefined,
                            platform: 'XBOX',
                            rating: undefined,
                            release_date: undefined,
                            review: undefined,
                            status: 'Playing',
                            title: 'super sick game on my play list',
                            _id: '777777'
                        }
                    ]
                }
            }
        };

        jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(mockResponse));

        render(<Games />);

        await waitFor(() => {
            expect(screen.getByText('super sick game on my play list'));
        });
    });
});
