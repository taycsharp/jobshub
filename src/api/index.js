import axios from 'axios';

const API = axios.create({ baseURL: 'https://jobshub.herokuapp.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchJob = (id) => API.get(`/jobs/${id}`);
export const fetchjobs = (page) => API.get(`/jobs?page=${page}`);
export const fetchjobsByCreator = (name) => API.get(`/jobs/creator?name=${name}`);
export const fetchjobsBySearch = (searchQuery) => API.get(`/jobs/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createJob = (newJob) => API.post('/jobs', newJob);
export const likeJob = (id) => API.patch(`/jobs/${id}/likePost`);
export const comment = (value, id) => API.post(`/jobs/${id}/commentJob`, { value });
export const updateJob = (id, updatedJob) => API.patch(`/jobs/${id}`, updatedJob);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
