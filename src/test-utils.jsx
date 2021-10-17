import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import api from '../src/api';
import thunk from 'redux-thunk';

let history = createMemoryHistory();

export default function render(
    ui,
    {
        initialState,
        store = createStore(rootReducer, initialState, applyMiddleware(thunk.withExtraArgument(api))),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
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
