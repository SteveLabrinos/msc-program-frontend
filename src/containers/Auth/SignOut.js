import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { logout, authSelector } from './authSlice';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 12/3/2021.
 */

export default function Logout() {
    const dispatch = useDispatch();

    const { token, sessionId } = useSelector(authSelector);

    //  async action dispatching in order to post logout to the backend
    const onUserLogout = useCallback(() => {
        dispatch(logout(sessionId, token));
    }, [dispatch, token, sessionId]);

    useEffect(() => {
        onUserLogout();
    });

    return <Redirect to="/" />;
}