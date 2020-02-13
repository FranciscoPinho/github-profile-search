import axios from "axios";
import * as userService from "../../api/userService";
import actionTypes from './actionTypes'

const getUserRequest = () => ({
  type: actionTypes.GET_USER
});

const getUserSucess = user => ({
  type: actionTypes.GET_USER_SUCCESS,
  payload: user
});

const getUserFailure = error => ({
  type: actionTypes.GET_USER_FAILURE,
  payload: { error }
});

export const resetSearch = () => ({
  type: actionTypes.RESET_USER_SEARCH
});

export const getUser = username => dispatch => {
  dispatch(getUserRequest());
  return axios
    .get(userService.GET.byUsername(username))
    .then(response => {
      const { data } = response;
      const user = {
        profileImage: data.avatar_url,
        profileLink: data.html_url,
        name: data.name,
        location: data.location,
        email: data.email
      };
      dispatch(getUserSucess(user));
    })
    .catch(err => {
      let error;
      switch (err.response.status) {
        case userService.ERROR_CODES.USER_NOT_FOUND:
          error = userService.ERROR_MESSAGES.USER_NOT_FOUND(username);
          break;
        case userService.ERROR_CODES.API_RATE_LIMIT:
          error = userService.ERROR_MESSAGES.API_RATE_LIMIT;
          break;
        default:
          error = userService.ERROR_MESSAGES.OTHER;
          break;
      }
      dispatch(getUserFailure(error));
    });
};
