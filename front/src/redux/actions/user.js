import {
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOAD_EN,
    AUTH_LOAD_DIS,
    GET_DEVELOPERS_SUCCESS,
    GET_DEVELOPERS_FAILED,
    GET_MANAGERS_SUCCESS,
    GET_MANAGERS_FAILED
    } from '../types'
    import axios from 'axios'
import { API_URL } from '../../utils/config';
    export const authentification = (body) => async dispatch => {
        try {
            dispatch({
                type: AUTH_LOAD_EN
            })
            const res = await axios.post(`${API_URL}/api/signin`,body);
           
            if (res.data.success) {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: res.data
                })
                window.location.href = '/'
            }
        }catch(err) {
            console.log(err)
            if(err?.response?.data) {
                dispatch({
                    type: AUTH_FAIL,
                    payload: "Credential not valid."
                })
                dispatch({
                    type: AUTH_LOAD_DIS
                })
            }else {
                dispatch({
                    type: AUTH_FAIL,
                    payload: "something wrong."
                })
                dispatch({
                    type: AUTH_LOAD_DIS
                })
            }
        }
    }

    export const getDevelopers = () => async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/api/developers`,{headers: {
                Authorization: localStorage.getItem("token")
            }});
           
            if (res.data.success) {
                dispatch({
                    type: GET_DEVELOPERS_SUCCESS,
                    payload: res.data
                })
            }
        }catch(err) {
            console.log(err)
            if(err?.response?.data) {
                dispatch({
                    type: GET_DEVELOPERS_FAILED,
                    payload: "Bad Request"
                })
            }else {
                dispatch({
                    type: GET_DEVELOPERS_FAILED,
                    payload: "something wrong."
                })
            }
        }
    }



    export const getManagers = () => async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/api/managers`,{headers: {
                Authorization: localStorage.getItem("token")
            }});
           
            if (res.data.success) {
                dispatch({
                    type: GET_MANAGERS_SUCCESS,
                    payload: res.data
                })
            }
        }catch(err) {
            console.log(err)
            if(err?.response?.data) {
                dispatch({
                    type: GET_MANAGERS_FAILED,
                    payload: "Bad Request"
                })
            }else {
                dispatch({
                    type: GET_MANAGERS_FAILED,
                    payload: "something wrong."
                })
            }
        }
    }