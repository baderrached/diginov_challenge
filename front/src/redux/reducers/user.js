import {
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOAD_EN,
    AUTH_LOAD_DIS,
    AUTH_RESET_STATE,
    GET_DEVELOPERS_SUCCESS,
    GET_DEVELOPERS_FAILED,
    GET_MANAGERS_SUCCESS
  } from "../types";
  
  const initialState = {
    user: null,
    token: null,
    loading: false,
    isError: false,
    error: null,
    get_developers_error: null,
    get_developers_iserror: false,
    get_managers_error: null,
    get_managers_iserror: false,
    developers: [],
    managers: []
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_SUCCESS:
        return {
          ...state,
          user: localStorage.setItem("userdata", JSON.stringify(action.payload)),
          token: localStorage.setItem("token", action.payload.token),
          isError: false,
          error: null,
        };
      case AUTH_LOAD_EN:
        return { ...state, loading: true };
      case AUTH_LOAD_DIS:
        return { ...state, loading: false };
      case AUTH_FAIL:
        return {
          ...state,
          isError: true,
          error: action.payload,
        };
      case AUTH_RESET_STATE:
        return {
          ...state,
          isError: null,
          error: null,
        };
      case GET_DEVELOPERS_SUCCESS:
        return {
          ...state,
          developers: action.payload.data,
          get_developers_error: null,
          get_developers_iserror: false
        };
      case GET_DEVELOPERS_FAILED:
        return {
          ...state,
          get_developers_error: action.payload,
          get_developers_iserror: true
        }
        case GET_MANAGERS_SUCCESS:
        return {
          ...state,
          managers: action.payload.data,
          get_managers_error: null,
          get_developers_iserror: false
        };
      case GET_DEVELOPERS_FAILED:
        return {
          ...state,
          get_managers_error: action.payload,
          get_managers_iserror: true
        }
      default:
        return state;
    }
  };
  
  export default userReducer;
  