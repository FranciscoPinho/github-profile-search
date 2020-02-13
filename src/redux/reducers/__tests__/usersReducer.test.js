import usersReducer from "../usersReducer";
import actionTypes from "../../actions/actionTypes";

const initialState = {
  error: null,
  loading: false,
  user: null
};
const getUserState = {
  ...initialState,
  loading: true
};

const user = {
  name: "FranciscoPinho",
  profileLink: "testLink",
  profileImage: "https://identicons.github.com/jasonlong.png",
  email: "example@gmail.com",
  location: "Porto, Portugal"
};

const error = { error: "Unknown error" };

describe("usersReducer", () => {
  it("should return the initial state", () => {
    expect(usersReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle GET_USER correctly", () => {
    expect(
      usersReducer(undefined, {
        type: actionTypes.GET_USER
      })
    ).toEqual(getUserState);
  });
  it("should handle GET_USER_SUCCESS correctly", () => {
    expect(
      usersReducer(getUserState, {
        type: actionTypes.GET_USER_SUCCESS,
        payload: user
      })
    ).toEqual({
      ...getUserState,
      user,
      loading: false
    });
  });
  it("should handle GET_USER_FAILURE correctly", () => {
    expect(
      usersReducer(getUserState, {
        type: actionTypes.GET_USER_FAILURE,
        payload: { error }
      })
    ).toEqual({
      ...getUserState,
      error,
      loading: false
    });
  });
  it("should handle RESET_USER_SEARCH correctly", () => {
    expect(
      usersReducer(getUserState, {
        type: actionTypes.RESET_USER_SEARCH
      })
    ).toEqual(initialState);
  });
});
