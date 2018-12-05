import axios from 'axios'

// ACTION TYPES

const GET_STUDENTS = 'GET_STUDENTS';

// ACTION CREATORS

export const getStudents = (students) => {
  return { type: GET_STUDENTS, students };
}

// THUNK CREATORS

export const fetchStudents = () => {
  return async (dispatch) => {
    const {data} = await axios.get('/api/students');
    dispatch(getStudents(data));
  }
}

const initialState = {
  list: []
}

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        list: action.students
      }
    default:
      return state
  }
}

export default studentsReducer
