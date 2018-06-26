import * as Redux from 'redux';
import restMiddlewareCreator from 'redux-fetch-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TRANSPORT_METHOD, FETCH } from '../transport-utilities/Constants';
import reducers from '../reducers'

let middleware = [];

if (TRANSPORT_METHOD === FETCH) {
    const globalRestOptions = {
        // Suffix will auto append to every action type, then we can dispatch different situation.
        suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],
        // if `debug` is true, then in reducer `action.meta.$requestOptions`
        debug: true,
        // Global value by `responseType`. Available values: json, text, formData, blob, arrayBuffer (fetch methods). Default: json
        responseType: 'text',
        // config
        fetchOptions: {
            // mode: 'no-cors', // TODO
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    };
    const restMiddleware = restMiddlewareCreator(globalRestOptions);
    middleware.push(restMiddleware);
}

let store = Redux.createStore(reducers, composeWithDevTools(Redux.applyMiddleware(...middleware)));

export default store;