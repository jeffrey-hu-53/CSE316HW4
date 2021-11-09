import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    UPDATE_ERROR_STATUS: "UPDATE_ERROR_STATUS",
    LOGIN_USER: "LOGIN_USER",
    UPDATE_ERROR_STATUS: "UPDATE_ERROR_STATUS"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorStatus: false,
        errorMessage: null
    });

    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorStatus: false,
                    errorMessage: null
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorStatus: false,
                    errorMessage: null
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorStatus: false,
                    errorMessage: null
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorStatus: false,
                    errorMessage: null
                })
            }
            case AuthActionType.UPDATE_ERROR_STATUS: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorStatus: payload.errorStatus,
                    errorMessage: payload.errorMessage
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch (e){
            // authReducer({
            //     type: AuthActionType.UPDATE_ERROR_STATUS,
            //     payload: {
            //         errorMessage: e.response.data.errorMessage,
            //         errorStatus: true
            //     }
            // })
            // console.log(e.response.data.errorMessage);
        }
        
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        } catch (e){
            console.log(e)
            authReducer({
                type: AuthActionType.UPDATE_ERROR_STATUS,
                payload: {
                    errorMessage: e.response.data.errorMessage,
                    errorStatus: true
                }
            })
            console.log(e.response.data.errorMessage);
        } 
        
    }

    auth.loginUser = async function(userData){
        try{
            console.log("sending login request")
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch (e){
            console.log(e);
            authReducer({
                type: AuthActionType.UPDATE_ERROR_STATUS,
                payload: {
                    errorMessage: e.response.data.errorMessage,
                    errorStatus: true
                }
            })
        } 
    }

    auth.turnOffErrorStatus = () => {
        authReducer({
            type: AuthActionType.UPDATE_ERROR_STATUS,
            payload: {
                errorStatus: false,
                errorMessage: null
            }
        })
        console.log(auth.errorStatus) 
    }

    

    auth.logoutUser = async () => {
        try{
            console.log("sending logout request")
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER
                })
                history.push("/");
            }
        } catch (e){
            console.log(e);
            // authReducer({
            //     type: AuthActionType.UPDATE_ERROR_STATUS,
            //     payload: {
            //         errorMessage: e.response.data.errorMessage,
            //         errorStatus: true
            //     }
            // })
        } 
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };