import {
    GET_PROJECT_EN,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_DIS,
    GET_PROJECT_FAILED,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILED,
    RESET_PROJECT
  } from "../types";
  
  const initialState = {
    projects: [],
    project: null,
    loading: false,
    error: "",
    isError: false,
  };
  
  const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PROJECT_SUCCESS:
        return {
          ...state,
          projects: action.payload.data,
          isError: false,
          error: ""
        };
      case GET_PROJECT_EN:
        return { ...state, loading: true };
      case GET_PROJECT_DIS:
        return { ...state, loading: false };
      case GET_PROJECT_FAILED:
        return {
          ...state,
          isError: true,
          error: action.payload,
        };
      case CREATE_PROJECT_SUCCESS: 
        return {
          ...state,
          project: action.payload.data
        }
        case CREATE_PROJECT_FAILED:
          return {
            ...state,
            isError: true,
            error: action.payload,
          };
      case RESET_PROJECT:
        return {
          ...state,
          project: null
        }
      default:
        return state;
    }
  };
  
  export default projectReducer;
  