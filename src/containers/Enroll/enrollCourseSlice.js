import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

const enrollCourseSlice = createSlice({
    name: 'enrollCourse',
    initialState: {
        enrollLoading: false,
        enrollCourses: [],
        enrollError: null,
        created: false,
        //  temp lists until they are provided from the backend
        courseTypes: [
            { code: 'MANDATORY', value: 'Υποχρεωτικό'},
            { code: 'NON_MANDATORY', value: 'Προεταιρικό'},
        ],
        statisticsLoading: false,
        statisticsError: null,
        statistics: null,
    },
    reducers: {
        enrollStart: state => {
            state.enrollLoading = true;
            state.created = false;
        },
        fetchEnrollSuccess: (state, action) => {
            state.enrollCourses = action.payload;
            state.enrollLoading = false;
        },
        enrollFail: (state, action) => {
            state.enrollError = action.payload;
            state.enrollLoading = false;
        },
        updateEnrollSuccess: (state, action) => {
            const updatedCourse = state.enrollCourses[action.payload.index];
            updatedCourse.status = action.payload.status;
            state.enrollCourses[action.payload.index] = updatedCourse;
            state.enrollLoading = false;
            state.created = true;
        },
        clearCreated: state => {
            state.created = false;
        },
        statisticsStart: state => {
            state.statisticsLoading = true;
        },
        statisticsFail: (state, action) => {
            state.statisticsError = action.payload;
            state.statisticsLoading = false;
        },
        statisticsSuccess: (state, action) => {
            state.statistics = action.payload;
            state.statisticsLoading = false;
        },
        decreaseEnrolls: state => {
            const updatedStatistics = state.statistics;
            updatedStatistics.enrolls = updatedStatistics.enrolls - 1;
            state.statistics = updatedStatistics;
        },
        increaseEnrolls: state => {
            const updatedStatistics = state.statistics;
            updatedStatistics.enrolls = updatedStatistics.enrolls + 1;
            state.statistics = updatedStatistics;
        },
    }
});

export const { enrollStart, fetchEnrollSuccess, enrollFail, statisticsStart,
    updateEnrollSuccess, clearCreated, statisticsFail, increaseEnrolls,
    statisticsSuccess, decreaseEnrolls } = enrollCourseSlice.actions;

//  async actions using thunk and logic actions that dispatch many actions
export const fetchEnrollCourses = token => dispatch => {
    const getEnrollCourses = async () => {
        const response = await fetch(`${baseURL}/enroll-courses`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });

        const data = await response.json();
        response.ok ?
            dispatch(fetchEnrollSuccess(data.data.courses)) :
            dispatch(enrollFail(data.messages.join(', ')));
    };
    dispatch(enrollStart());
    getEnrollCourses().catch(error => console.log(error));
};

export const updateEnrollCourse = (id, index, status) => dispatch => {
    const patchCourse = async () => {
        const postData = {
            status: status === 'REGISTERED' ? 'NOT_REGISTERED' : 'REGISTERED'
        };

        const response = await fetch(`${baseURL}/enroll-courses/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });

        const data = await response.json();
        const payload = {
            index: index,
            status: postData.status
        }
        response.ok ?
            dispatch(updateEnrollSuccess(payload)) :
            dispatch(enrollFail(data.messages.join(', ')));
    };

    dispatch(enrollStart());
    patchCourse().catch(error => console.log(error));
};

export const fetchStatistics = id => dispatch => {
    const getStatistics = async () => {
        const response = await fetch(`${baseURL}/statistics/${id}`, {
            method: 'GET'
        });

        const data = await response.json();

        response.ok ?
            dispatch(statisticsSuccess({ ...data.data })) :
            dispatch(statisticsFail(data.messages.join(', ')));
    };

    dispatch(statisticsStart());
    getStatistics().catch(error => console.log(error));
};

//  selectors
export const enrollSelector = state => state.enrollCourse;


export default enrollCourseSlice.reducer;