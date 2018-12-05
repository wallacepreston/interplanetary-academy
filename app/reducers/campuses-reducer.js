import axios from 'axios'

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_SELECTED_CAMPUS = 'GET_SELECTED_CAMPUS'

// ACTION CREATORS

export const getCampuses = (campuses) => {
  return { type: GET_CAMPUSES, campuses };
}

export const getSelectedCampus = (campus) => {
  return { type: GET_SELECTED_CAMPUS, campus };
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

// REDUCER

const initialState = {
  list: [],
  selected: {}
}

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
    default:
      return state
  }
}

export default campusesReducer
