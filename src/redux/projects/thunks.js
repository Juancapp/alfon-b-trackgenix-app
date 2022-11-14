import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectsPending,
  deleteProjectsSuccess,
  deleteProjectsError
} from './actions';

export const getProjects = () => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getProjectsSuccess(data.data));
      } else {
        dispatch(getProjectsError(data.message.toString()));
      }
    } catch (error) {
      dispatch(getProjectsError(error.toString()));
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(deleteProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteProjectsSuccess(id));
      } else {
        dispatch(deleteProjectsError());
      }
    } catch (error) {
      dispatch(deleteProjectsError(error.toString()));
    }
  };
};