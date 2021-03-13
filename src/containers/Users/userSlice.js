import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userLoading: false,
        users: [],
        userError: null,
        created: false,
        //  temp lists until they are provided from the backend
        roleTypes: [
            { code: 'STUFF', value: 'Γραμματεία'},
            { code: 'TEACHER', value: 'Καθηγητής'},
            { code: 'STUDENT', value: 'Μαθητής'},
        ],
    },
    reducers: {
        userStart: state => {
            state.userLoading = true;
            state.created = false;
        },
        fetchUserSuccess: (state, action) => {
            state.users = action.payload;
            state.userLoading = false;
        },
        userFail: (state, action) => {
            state.userError = action.payload;
            state.userLoading = false;
        },
        addUserSuccess: (state, action) => {
            state.users.push(action.payload);
            state.userLoading = false;
            state.created = true;
        },
        updateUserSuccess: (state, action) => {
            state.users = state.users.map(user => (
                user.id === action.payload.id ?
                    action.payload : user
            ));
            state.userLoading = false;
            state.created = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users = state.users.filter(u => u.id !== action.payload);
            state.userLoading = false;
            state.created = true;
        },
        clearUserError: state => {
            state.userError = null;
        },
        clearCreated: state => {
            state.created = false;
        },
    }
});

export const { userStart, fetchUserSuccess, userFail,
    addUserSuccess, updateUserSuccess, deleteUserSuccess,
    clearUserError, clearCreated } = userSlice.actions;

//  async actions using thunk and logic actions that dispatch many actions
export const fetchUsers = () => dispatch => {
    const getUsers = async () => {
        const response = await fetch(`${baseURL}/users`);

        const data = await response.json();
        response.ok ?
            dispatch(fetchUserSuccess(data.data.users)) :
            dispatch(userFail(data.messages.join(', ')));
    };
    dispatch(userStart());
    getUsers().catch(error => console.log(error));
};

export const createUser = (user, token) => dispatch => {
    const postUser = async () => {
        const response = await fetch(`${baseURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        response.ok ?
            dispatch(addUserSuccess(data.data)) :
            dispatch(userFail(data.messages.join(', ')));
    };

    dispatch(userStart());
    postUser().catch(error => console.log(error));
};

export const updateUser = (user, token, id) => dispatch => {
    const patchUser = async () => {
        const response = await fetch(`${baseURL}/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        response.ok ?
            dispatch(updateUserSuccess(data.data)) :
            dispatch(userFail(data.messages.join(', ')));
    };

    dispatch(userStart());
    patchUser().catch(error => console.log(error));
};

export const deleteUser = (token, id) => dispatch => {
    const delUser = async () => {
        const response = await fetch(`${baseURL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        const data = await response.json();
        response.ok ?
            dispatch(deleteUserSuccess(data.data.id)) :
            dispatch(userFail(data.messages.join(', ')));
    };

    dispatch(userStart());
    delUser().catch(error => console.log(error));
};

//  selectors
export const userSelector = state => state.user;


export default userSlice.reducer;