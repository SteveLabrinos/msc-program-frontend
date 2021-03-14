import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        courseLoading: false,
        courses: [],
        courseError: null,
        created: false,
        //  temp lists until they are provided from the backend
        courseTypes: [
            { code: 'MANDATORY', value: 'Υποχρεωτικό'},
            { code: 'NON_MANDATORY', value: 'Προεταιρικό'},
        ],
    },
    reducers: {
        courseStart: state => {
            state.courseLoading = true;
            state.created = false;
        },
        fetchCourseSuccess: (state, action) => {
            state.courses = action.payload;
            state.courseLoading = false;
        },
        courseFail: (state, action) => {
            state.courseError = action.payload;
            state.courseLoading = false;
        },
        addCourseSuccess: (state, action) => {
            state.courses.push(action.payload);
            state.courseLoading = false;
            state.created = true;
        },
        updateCourseSuccess: (state, action) => {
            state.courses = state.courses.map(course => (
                course.id === action.payload.id ?
                    action.payload : course
            ));
            state.courseLoading = false;
            state.created = true;
        },
        deleteCourseSuccess: (state, action) => {
            state.courses = state.courses.filter(c => c.id !== action.payload);
            state.courseLoading = false;
            state.created = true;
        },
        clearCourseError: state => {
            state.courseError = null;
        },
        clearCreated: state => {
            state.created = false;
        },
    }
});

export const { courseStart, fetchCourseSuccess, courseFail,
    addCourseSuccess, updateCourseSuccess, deleteCourseSuccess,
    clearCourseError, clearCreated } = courseSlice.actions;

//  async actions using thunk and logic actions that dispatch many actions
export const fetchCourses = () => dispatch => {
    const getCourses = async () => {
        const response = await fetch(`${baseURL}/courses`);

        const data = await response.json();
        response.ok ?
            dispatch(fetchCourseSuccess(data.data.courses)) :
            dispatch(courseFail(data.messages.join(', ')));
    };
    dispatch(courseStart());
    getCourses().catch(error => console.log(error));
};

export const createCourse = (course, token) => dispatch => {
    const postCourse = async () => {
        const response = await fetch(`${baseURL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(course)
        });

        const data = await response.json();
        response.ok ?
            dispatch(addCourseSuccess(data.data)) :
            dispatch(courseFail(data.messages.join(', ')));
    };

    dispatch(courseStart());
    postCourse().catch(error => console.log(error));
};

export const updateCourse = (course, token, id) => dispatch => {
    const patchCourse = async () => {
        const response = await fetch(`${baseURL}/courses/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(course)
        });

        const data = await response.json();
        response.ok ?
            dispatch(updateCourseSuccess(data.data)) :
            dispatch(courseFail(data.messages.join(', ')));
    };

    dispatch(courseStart());
    patchCourse().catch(error => console.log(error));
};

export const deleteCourse = (token, id) => dispatch => {
    const delCourse = async () => {
        const response = await fetch(`${baseURL}/courses/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const data = await response.json();
        response.ok ?
            dispatch(deleteCourseSuccess(data.data.id)) :
            dispatch(courseFail(data.messages.join(', ')));
    };

    dispatch(courseStart());
    delCourse().catch(error => console.log(error));
};

//  selectors
export const courseSelector = state => state.course;


export default courseSlice.reducer;