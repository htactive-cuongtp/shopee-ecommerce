import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/Navbar';
import FormCommon from '../../components/Form';
import { auth } from '../../constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setLoading, setAuthError } from '../../redux/User/user.actions';

const LoginPageContainer = () => {
    const checkLog = useSelector(state => state.user.authErr);
    const isLoading = useSelector(state => state.user.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthError());
    }, []);

    const handleSignin = (user) => {
        const action = loginUser(user);
        dispatch(action);
    };

    const handleChangeLoading = () => {
        const action = setLoading();
        dispatch(action);
    };

    return (
        <div className="shopee-login">
            <NavBar isLogin={true} />
            <FormCommon 
                isLogin={true}                 
                isError={checkLog}
                isLoading={isLoading}
                onAction={handleSignin}
                onSetLoading={handleChangeLoading}
            />
        </div>
    );
};

LoginPageContainer.propTypes = {
    
};

export default LoginPageContainer;