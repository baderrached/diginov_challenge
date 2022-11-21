import {
  GET_TASKS_EN,
  GET_TASKS_SUCCESS,
  GET_TASKS_DIS,
  GET_TASKS_FAILED,
  CREATE_TASK_FAILED,
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_ENABLE,
  UPDATE_TASK_DISABLE
} from '../types'
import axios from "axios";
import { API_URL } from '../../utils/config';


export const getTasks = (projectId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TASKS_EN
    })
    const res = await axios.get(`${API_URL}/api/tasks/${projectId}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    if (res.data.success) {
      dispatch({
        type: GET_TASKS_SUCCESS,
        payload: res.data
      })
    }
  } catch (err) {
    console.log(err)
    if (err?.response?.data) {
      dispatch({
        type: GET_TASKS_FAILED,
        payload: err.response.data.message
      })
      dispatch({
        type: GET_TASKS_DIS
      })
    } else {
      dispatch({
        type: GET_TASKS_FAILED,
        payload: "Something Wrong."
      })
      dispatch({
        type: GET_TASKS_DIS
      })
    }
  }
};

export const createTask = (body) => async dispatch => {
  try {
      const res = await axios.post(`${API_URL}/api/task`,body,{headers: {
          Authorization: localStorage.getItem("token")
      }});
      if (res.data.success) {
          dispatch({
              type: CREATE_TASK_SUCCESS,
              payload: res.data
          })
      }
  }catch(err) {
      console.log(err)
      if(err?.response?.data) {
          dispatch({
              type: CREATE_TASK_FAILED,
              payload: err.response.data.message
          })
      }else {
          dispatch({
              type: CREATE_TASK_FAILED,
              payload: "Something Wrong."
          })
      }
  }
}

export const changeTaskStatus = (taskId,body) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TASK_ENABLE
    })
    const res = await axios.put(`${API_URL}/api/task/status/${taskId}`,body, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
  
    if (res.data.success) {
      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: res.data
      })
    }
  } catch (err) {
    console.log(err)
    if (err?.response?.data) {
      dispatch({
        type: UPDATE_TASK_FAILED,
        payload: "Credential not valid."
      })
      dispatch({
        type: UPDATE_TASK_DISABLE
      })
    } else {
      dispatch({
        type: UPDATE_TASK_FAILED,
        payload: "Something Wrong."
      })
      dispatch({
        type: UPDATE_TASK_DISABLE
      })
    }
  }
};