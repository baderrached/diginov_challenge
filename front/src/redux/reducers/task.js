import {
  GET_TASKS_EN,
  GET_TASKS_SUCCESS,
  GET_TASKS_DIS,
  GET_TASKS_FAILED,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILED,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_DISABLE,
  UPDATE_TASK_ENABLE
} from "../types";

const initialState = {
  tasks: [],
  task: null,
  update_task: null,
  loading: false,
  error: "",
  isError: false
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.data,
        task: null,
        isError: false,
        error: "",
        create_error: null,
        create_iserror: null
      };
    case GET_TASKS_EN:
      return { ...state, loading: true };
    case GET_TASKS_DIS:
      return { ...state, loading: false };
    case GET_TASKS_FAILED:
      return {
        ...state,
        isError: true,
        error: action.payload,
      };
      case CREATE_TASK_SUCCESS:
      return { ...state, task: action.payload.data };
      case CREATE_TASK_FAILED:
        return {
          ...state,
          isError: true,
          error: action.payload,
        };
      case UPDATE_TASK_SUCCESS:
        return {
          ...state,
          update_task: action.payload.data
        }
      case UPDATE_TASK_FAILED:
        return {
          ...state,
          error: action.payload,
          isError: true
        }
      case UPDATE_TASK_DISABLE:
        return {
          ...state,
          loading: false
        }
      case UPDATE_TASK_ENABLE:
        return {
          ...state,
          loading: true
        }
    default:
      return state;
  }
};

export default taskReducer;
