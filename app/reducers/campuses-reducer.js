import axios from 'axios'

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';

// ACTION CREATORS

export const getCampuses = (campuses) => {
  return { type: GET_CAMPUSES, campuses };
}

// THUNK CREATORS

export const fetchCampuses = () => {
  return async (dispatch) => {
    const {data} = await axios.get('/api/campuses');
    dispatch(getCampuses(data));
  }
}

// REDUCER

const initialState = {
  list: []
}

const campusesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAMPUSES:
      return {
        ...state,
        list: action.campuses
      }
    default:
      return state
  }
}

export default campusesReducer
