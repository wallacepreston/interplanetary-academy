import axios from 'axios'

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_SELECTED_CAMPUS = 'GET_SELECTED_CAMPUS'
const ADD_CAMPUS = 'ADD_CAMPUS'
const UPDATE_CAMPUSES = 'UPDATE_CAMPUSES'

// ACTION CREATORS

export const getCampuses = (campuses) => {
  return { type: GET_CAMPUSES, campuses };
}

export const getSelectedCampus = (campus) => {
  return { type: GET_SELECTED_CAMPUS, campus };
}

export const addCampus = (campus) => {
  return {type: ADD_CAMPUS, campus};
}

export const updateCampuses = (campuses) => {
  return { type: UPDATE_CAMPUSES, campuses}
}

// THUNK CREATORS

export const fetchCampuses = () => {
  return async (dispatch) => {
    const {data} = await axios.get('/api/campuses');
    dispatch(getCampuses(data));
  }
}

export const fetchSelectedCampus = (campusId) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/campuses/${campusId}`);
    dispatch(getSelectedCampus(data));
  }
}

// INITIAL STATE

const initialState = {
  list: [],
  selected: {students: []}
}

// REDUCER

const campusesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAMPUSES:
      return {
        ...state,
        list: action.campuses
      }
    case GET_SELECTED_CAMPUS:
    return {
      ...state,
      selected: action.campus
    }
    case ADD_CAMPUS:
    return {
      ...state,
      list: [...state.list, action.campus]
    }
    default:
      return state
  }
}

export default campusesReducer
