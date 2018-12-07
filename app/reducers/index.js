import {combineReducers} from 'redux'
import campusesReducer from './campuses-reducer'
import studentsReducer from './students-reducer'


// MY COMBINEREDUCER
const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer
})

export default reducer
