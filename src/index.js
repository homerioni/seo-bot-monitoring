import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './assets/fonts/circe/stylesheet.css';
import './assets/scss/global.scss';
import './assets/scss/st.scss';

import {QueryClientProvider, QueryClient} from "react-query";
import {defaultCatch} from "./utils/tools";

export let addAlert = () => {};
const alertCallback = (setAlert) => {
    addAlert = setAlert;
};
const queryClient = new QueryClient({defaultOptions: {queries: {onError: e => {
    defaultCatch(e, addAlert);
}}}});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <App alertCallback={alertCallback}/>
    </QueryClientProvider>
);