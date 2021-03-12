import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../containers/Auth/authSlice';


/** @author Stavros Labrinos [stalab at linuxmail.org] on 12/3/21.*/

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});

export default store;
