import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import { getUser } from "../userActions";
import * as userService from "../../../api/userService";
import actionTypes from "../actionTypes";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Async Get User", () => {
  it("creates GET_USER_SUCCESS when fetching user has been done", async () => {
    axios.get.mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          resolve({
            data: {
              avatar_url: "link",
              html_url: "link",
              name: "name",
              location: "location",
              email: "email"
            }
          });
        })
    );
    const expectedActions = [
      { type: actionTypes.GET_USER },
      {
        type: actionTypes.GET_USER_SUCCESS,
        payload: {
          profileImage: "link",
          profileLink: "link",
          name: "name",
          location: "location",
          email: "email"
        }
      }
    ];
    const store = mockStore({ user: null });
    await store.dispatch(getUser("username"));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates GET_USER_FAILURE when getting non existent user", async () => {
    axios.get.mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          reject({
            response: {
              status: 404
            }
          });
        })
    );
    const username = "username";
    const expectedActions = [
      { type: actionTypes.GET_USER },
      {
        type: actionTypes.GET_USER_FAILURE,
        payload: {
          error: userService.ERROR_MESSAGES.USER_NOT_FOUND(username)
        }
      }
    ];
    const store = mockStore({ user: null });
    await store.dispatch(getUser(username));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates GET_USER_FAILURE when api rate limit is reached", async () => {
    axios.get.mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          reject({
            response: {
              status: 403
            }
          });
        })
    );
    const expectedActions = [
      { type: actionTypes.GET_USER },
      {
        type: actionTypes.GET_USER_FAILURE,
        payload: {
          error: userService.ERROR_MESSAGES.API_RATE_LIMIT
        }
      }
    ];
    const store = mockStore({ user: null });
    await store.dispatch(getUser("username"));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates GET_USER_FAILURE on unknown failure during request", async () => {
    axios.get.mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          reject({
            response: {
              status: 400
            }
          });
        })
    );
    const expectedActions = [
      { type: actionTypes.GET_USER },
      {
        type: actionTypes.GET_USER_FAILURE,
        payload: {
          error: userService.ERROR_MESSAGES.OTHER
        }
      }
    ];
    const store = mockStore({ user: null });
    await store.dispatch(getUser("username"));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
