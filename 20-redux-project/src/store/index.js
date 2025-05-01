import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./auth";
import counterSlice from "./counter";

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
    }
});

console.log('initial Stage', store.getState());

//exporting store as default
export default store;
