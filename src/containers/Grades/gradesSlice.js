import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

const gradeSlice = createSlice({
    name: 'grade',
    initialState: {
        gradeLoading: false,
        gradeCourses: [],
        gradeStudents: [],
        gradeError: null,
    },
    reducers: {
        gradeStart: state => {
            state.gradeLoading = true;
            state.created = false;
        },
        fetchGradeCourseSuccess: (state, action) => {
            state.gradeCourses = action.payload;
            state.gradeLoading = false;
        },
        fetchGradeStudentsSuccess: (state, action) => {
            state.gradeStudents = action.payload;
            state.gradeLoading = false;
        },
        gradeFail: (state, action) => {
            state.gradeError = action.payload;
            state.gradeLoading = false;
        },
        updateGradeSuccess: (state, action) => {

            state.gradeLoading = false;
            state.created = true;
        },
    }
});

export const { gradeStart, fetchGradeCourseSuccess, gradeFail,
    fetchGradeStudentsSuccess, updateGradeSuccess } = gradeSlice.actions;

//  async actions using thunk and logic actions that dispatch many actions
export const fetchGradeCourses = token => dispatch => {
    const getCourses = async () => {
        const response = await fetch(`${baseURL}/grades`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const data = await response.json();
        response.ok ?
            dispatch(fetchGradeCourseSuccess(data.data.courses)) :
            dispatch(gradeFail(data.messages.join(', ')));
    };
    dispatch(gradeStart());
    getCourses().catch(error => console.log(error));
};

// export const createCourse = (course, token) => dispatch => {
//     const postCourse = async () => {
//         const response = await fetch(`${baseURL}/courses`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': token
//             },
//             body: JSON.stringify(course)
//         });
//
//         const data = await response.json();
//         response.ok ?
//             dispatch(addCourseSuccess(data.data)) :
//             dispatch(courseFail(data.messages.join(', ')));
//     };
//
//     dispatch(courseStart());
//     postCourse().catch(error => console.log(error));
// };
//
// export const updateCourse = (course, token, id) => dispatch => {
//     const patchCourse = async () => {
//         const response = await fetch(`${baseURL}/courses/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': token
//             },
//             body: JSON.stringify(course)
//         });
//
//         const data = await response.json();
//         response.ok ?
//             dispatch(updateCourseSuccess(data.data)) :
//             dispatch(courseFail(data.messages.join(', ')));
//     };
//
//     dispatch(courseStart());
//     patchCourse().catch(error => console.log(error));
// };
//
// export const deleteCourse = (token, id) => dispatch => {
//     const delCourse = async () => {
//         const response = await fetch(`${baseURL}/courses/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': token
//             }
//         });
//
//         const data = await response.json();
//         response.ok ?
//             dispatch(deleteCourseSuccess(data.data.id)) :
//             dispatch(courseFail(data.messages.join(', ')));
//     };
//
//     dispatch(courseStart());
//     delCourse().catch(error => console.log(error));
// };

//  selectors
export const gradeSelector = state => state.grade;


export default gradeSlice.reducer;