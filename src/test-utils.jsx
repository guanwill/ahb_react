import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer, initialState } from './store';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

let history = createMemoryHistory();

export default function render(
    ui,
    { initialState, store = createStore(rootReducer, initialState), ...renderOptions } = {}
) {
    // return {
    //     ...render(<Provider store={store}><Router history={history}>{ui}</Router></Provider>),
    //     store,
    // }

    console.log('ui....', ui);

    function Wrapper({ children }) {
        console.log('children....', children);

        return (
            <>
                <Provider store={store}>
                    <Router history={history}>{children}</Router>
                </Provider>
            </>
        );
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
