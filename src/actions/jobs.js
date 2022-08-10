import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_JOB, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getJob = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchJob(id);

    dispatch({ type: FETCH_JOB, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getjobs = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchjobs(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getjobsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchjobsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getjobsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchjobsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createJob = (job, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createJob(job);

    dispatch({ type: CREATE, payload: data });

    history.push(`/jobs/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = (id, job) => async (dispatch) => {
  try {
    const { data } = await api.updateJob(id, job);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeJob = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likeJob(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentJob = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteJob = (id) => async (dispatch) => {
  try {
    await await api.deleteJob(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
