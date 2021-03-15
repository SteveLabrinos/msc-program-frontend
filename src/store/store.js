import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../containers/Auth/authSlice';
import userReducer from '../containers/Users/userSlice';
import courseReducer from '../containers/Courses/courseSlice';
import enrollCourseReducer from '../containers/Enroll/enrollCourseSlice';


/** @author Stavros Labrinos [stalab at linuxmail.org] on 12/3/21.*/

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        course: courseReducer,
        enrollCourse: enrollCourseReducer,
    }
});

export default store;
