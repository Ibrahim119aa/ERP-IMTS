import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './itemSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export default store;
