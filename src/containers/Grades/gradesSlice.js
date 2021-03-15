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
            const updatedRegistration = state.gradeStudents[action.payload.index];
            updatedRegistration.grade = action.payload.grade;
            state.gradeStudents[action.payload.index] = updatedRegistration;
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

export const fetchGradeStudents = (token, courseId) => dispatch => {
    const getStudents = async () => {
        const response = await fetch(`${baseURL}/grades/${courseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const data = await response.json();
        response.ok ?
            dispatch(fetchGradeStudentsSuccess(data.data.students)) :
            dispatch(gradeFail(data.messages.join(', ')));
    };
    dispatch(gradeStart());
    getStudents().catch(error => console.log(error));
};

export const updateGrade = (registrationId, grade, index, courseId, token) => dispatch => {
    const patchData = { registrationId, grade };
    const patchGrade = async () => {
        const response = await fetch(`${baseURL}/grades/${courseId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(patchData)
        });

        const data = await response.json();
        const payload = { index, grade };
        response.ok ?
            dispatch(updateGradeSuccess(payload)) :
            dispatch(gradeFail(data.messages.join(', ')));
    };
    dispatch(gradeStart());
    patchGrade().catch(error => console.log(error));
};

//  selectors
export const gradeSelector = state => state.grade;


export default gradeSlice.reducer;