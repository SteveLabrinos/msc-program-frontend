import { baseURL } from '../../shared/utility';
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        role: null,
        firstName: null,
        lastName: null,
        sessionId: null,
        authError: null,
        authLoading: false,
        userId: null
    },
    reducers: {
        authStart: state => {
            state.authError = null;
            state.authLoading = true;
        },
        authFail: (state, action) => {
            state.authError = action.payload;
            state.authLoading = false;
        },
        authSuccess: (state, action) => {
            state.token = action.payload.accessToken;
            state.sessionId = action.payload.sessionId;
            state.role = action.payload.role;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userId = action.payload.userId;
            state.authError = null;
            state.authLoading = false;
        },
        authLogout: state => {
            state.token = null;
            state.sessionId = null;
            state.role = null;
            state.firstName = null;
            state.lastName = null;
            state.authLoading = false;
            state.userId = null;
        }
    }
});

//  export the reducers for the actions
export const { authStart, authFail, authSuccess, authLogout } = authSlice.actions;

//  async reducers that dispatch action using thunk
export const login = signInData => dispatch => {
    const postSessions = async () => {
        const response = await fetch(`${baseURL}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signInData)
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('msc-session-id', data.data.sessionId);
            localStorage.setItem('msc-access-token', data.data.accessToken);
            localStorage.setItem('msc-role', data.data.role);
            localStorage.setItem('msc-firstname', data.data.firstName);
            localStorage.setItem('msc-lastname', data.data.lastName);
            localStorage.setItem('msc-user-id', data.data.userId);
            dispatch(authSuccess(data.data));
        } else {
            dispatch(authFail(data.messages.join(', ')));
        }
    };

    dispatch(authStart());
    postSessions().catch(error => console.log(error));
};

export const logout = (sessionId, token) => dispatch => {
    const deleteSession = async () => {
        const response = await fetch(`${baseURL}/sessions/${sessionId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });

        const data = response.json();
        if (response.ok) {
            localStorage.removeItem('msc-session-id');
            localStorage.removeItem('msc-access-token');
            localStorage.removeItem('msc-role');
            localStorage.removeItem('msc-firstname');
            localStorage.removeItem('msc-lastname');
            localStorage.removeItem('msc-user-id');
            dispatch(authLogout());
        } else {
            dispatch(authFail(data.messages.join(', ')));
        }
    };
    dispatch(authStart());
    deleteSession().catch(error => console.log(error));
};

export const checkAuth = () => dispatch => {
    const signInData = {
        sessionId: localStorage.getItem('msc-session-id'),
        accessToken: localStorage.getItem('msc-access-token'),
        role: localStorage.getItem('msc-role'),
        firstName: localStorage.getItem('msc-firstname'),
        lastName: localStorage.getItem('msc-lastname'),
        userId: localStorage.getItem('msc-user-id'),
    };

    if (signInData) dispatch(authSuccess(signInData));
};

//  selectors
export const authSelector = state => state.auth;

export default authSlice.reducer;