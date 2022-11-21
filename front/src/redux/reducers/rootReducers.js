import { combineReducers } from 'redux'
import userReducer from './user'
import projectReducer from "./project"
import taskReducer from './task'
export default combineReducers({
    user: userReducer,
    project: projectReducer,
    task : taskReducer
})