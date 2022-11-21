
import {
    GET_PROJECT_EN,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_DIS,
    GET_PROJECT_FAILED,
    CLOSE_PROJECT_EN,
    CLOSE_PROJECT_SUCCESS,
    CLOSE_PROJECT_DIS,
    CLOSE_PROJECT_FAILED,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_LOAD_EN,
    CREATE_PROJECT_FAILED,
    CREATE_PROJECT_LOAD_DIS
} from '../types'
import axios from 'axios'
import { API_URL } from '../../utils/config';

export const getProjects = () => async dispatch => {
    try {
        dispatch({
            type: GET_PROJECT_EN
        })
        const res = await axios.get(`${API_URL}/api/projects`,{headers: {
            Authorization: localStorage.getItem("token")
        }});
        if (res.data.success) {
            dispatch({
                type: GET_PROJECT_SUCCESS,
                payload: res.data
            })
        }
    }catch(err) {
        console.log(err)
        if(err?.response?.data) {
            dispatch({
                type: GET_PROJECT_FAILED,
                payload: "bad request."
            })
            dispatch({
                type: GET_PROJECT_DIS
            })
        }else {
            dispatch({
                type: GET_PROJECT_FAILED,
                payload: "Something Wrong."
            })
            dispatch({
                type: GET_PROJECT_DIS
            })
        }
    }
}

export const createProject = (body) => async dispatch => {
    try {
        dispatch({
            type: CREATE_PROJECT_LOAD_EN
        })
        const res = await axios.post(`${API_URL}/api/project`,body,{headers: {
            Authorization: localStorage.getItem("token")
        }});
        if (res.data.success) {
            dispatch({
                type: CREATE_PROJECT_SUCCESS,
                payload: res.data
            })
        }
    }catch(err) {
        console.log(err)
        if(err?.response?.data) {
            dispatch({
                type: CREATE_PROJECT_FAILED,
                payload: err.response.data.message
            })
            dispatch({
                type: CREATE_PROJECT_LOAD_DIS
            })
        }else {
            dispatch({
                type: CREATE_PROJECT_FAILED,
                payload: "Something Wrong."
            })
            dispatch({
                type: CREATE_PROJECT_LOAD_DIS
            })
        }
    }
}

export const closeProject = (projectId) => async dispatch => {
    try {
        dispatch({
            type: CLOSE_PROJECT_EN
        })
        const res = await axios.get(`${API_URL}/api//project/close/${projectId}`,{headers: {
            Authorization: localStorage.getItem("token")
        }});
        if (res.data.success) {
            dispatch({
                type: CLOSE_PROJECT_SUCCESS,
                payload: res.data
            })
            window.location.href = '/'
        }
    }catch(err) {
        console.log(err)
        if(err?.response?.data) {
            dispatch({
                type: CLOSE_PROJECT_FAILED,
                payload: "bad request."
            })
            dispatch({
                type: CLOSE_PROJECT_DIS
            })
        }else {
            dispatch({
                type: CLOSE_PROJECT_FAILED,
                payload: "Something Wrong."
            })
            dispatch({
                type: CLOSE_PROJECT_DIS
            })
        }
    }
}