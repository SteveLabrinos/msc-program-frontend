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
            state.users.push({
                ...action.payload,
                createdDate: new Date()
                    .toISOString()
                    .replace(/T.*/, '')
            });
            state.userLoading = false;
            state.created = true;
        },
        updateUser: (state, action) => {
            state.users = state.users.map(user => (
                user.id === action.payload.id ?
                    {
                        ...action.payload,
                        createdDate: new Date()
                            .toISOString()
                            .replace(/T.*/, '')
                    } : user
            ));
            state.userLoading = false;
            state.created = true;
        },
        deleteUser: (state, action) => {
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
    addUserSuccess, updateUser, deleteUser,
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

// export const createNewItem = (item, token) => dispatch => {
//     const createItem = async () => {
//         const response = await fetch(`${baseURL}item?tokenId=${token }`, {
//             method: 'POST',
//             body: JSON.stringify(item)
//         });
//
//         if (response.ok) {
//             const id = await response.json();
//             dispatch(addItemSuccess({...item, id}));
//         } else {
//             dispatch(addItemFail(response.status));
//         }
//     };
//     //  function to sent data to the db
//     dispatch(addItemStart());
//     //  the async function here
//     createItem().catch(error => console.log(error));
// };
//
// export const updateExistingItem = (item, id, token) => dispatch => {
//     const postItem = async () => {
//         const response = await fetch(`${baseURL}item/id/${id}?tokenId=${token}`, {
//             method: 'PUT',
//             body: JSON.stringify(item)
//         });
//
//         response.ok ? dispatch(updateItem({...item, id})) : dispatch(addItemFail(response.status));
//     };
//     //  function to sent data to the db
//     dispatch(addItemStart());
//     //  the async function here
//     postItem().catch(error => console.log(error));
// };
//
// export const deleteExistingItem = (id, token) => dispatch => {
//     const removeItem = async () => {
//         const response = await fetch(`${baseURL}item/id/${id}?tokenId=${token}`, {
//             method: 'DELETE'
//         });
//
//         response.ok ? dispatch(deleteItem(id)) : dispatch(addItemFail());
//     };
//     dispatch(addItemStart());
//
//     removeItem().catch(error => console.log(error));
// };


//  selectors
export const userSelector = state => state.user;


export default userSlice.reducer;