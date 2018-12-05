import axios from 'axios'

// ACTION TYPES

const GET_STUDENTS = 'GET_STUDENTS';
const GET_SELECTED_STUDENT = 'GET_SELECTED_STUDENT'
const ADD_STUDENT = 'ADD_STUDENT'
// ACTION CREATORS

export const getStudents = (students) => {
  return { type: GET_STUDENTS, students };
}

export const getSelectedStudent = (student) => {
  return { type: GET_SELECTED_STUDENT, student };
}

export const addStudent = (student) => {
  return {type: ADD_STUDENT, student}
}

// THUNK CREATORS

export const fetchStudents = () => {
  return async (dispatch) => {
    const {data} = await axios.get('/api/students');
    dispatch(getStudents(data));
  }
}

export const fetchSelectedStudent = (studentId) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/students/${studentId}`);
    dispatch(getSelectedStudent(data));
  }
}

// INITIAL STATE

const initialState = {
  list: [],
  selected: {campus: {}}
}

// REDUCER

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        list: action.students
      }
    case GET_SELECTED_STUDENT:
    return {
      ...state,
      selected: action.student
    }
    case ADD_STUDENT:
    return {
      ...state,
      list: [...state.list, action.student]
    }
    default:
      return state
  }
}

export default studentsReducer
