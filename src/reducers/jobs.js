import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_JOB, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, jobs: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        jobs: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, jobs: action.payload.data };
    case FETCH_JOB:
      return { ...state, post: action.payload.post };
    case LIKE:
      return { ...state, jobs: state.jobs.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case COMMENT:
      return {
        ...state,
        jobs: state.jobs.map((post) => {
          if (post._id == +action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case CREATE:
      return { ...state, jobs: [...state.jobs, action.payload] };
    case UPDATE:
      return { ...state, jobs: state.jobs.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { ...state, jobs: state.jobs.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};

