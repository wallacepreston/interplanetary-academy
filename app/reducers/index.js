// `combineReducers` is not currently being used...but it should!
// When you're ready to use it, un-comment the line below!

import {combineReducers} from 'redux'
import campusesReducer from './campuses-reducer'
import studentsReducer from './students-reducer'


// MY COMBINEREDUCER
const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer
})

export default reducer;

// // ORIGINALLY THIS WAS WRITTEN. I GOT RID OF IT IN FAVOR OF USING ONLY CAMPUSREDUCER AND STUDENTREDUCER
// const initialState = {}

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state
//   }
// }

// export default rootReducer