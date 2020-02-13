import React from "react";
import { mount } from "enzyme";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash-es";
import { getUser, resetSearch } from "../../redux/actions/userActions";
import SearchUserPage from "../SearchUserPage";

jest.mock("lodash-es", () => ({
  debounce: jest.fn((fn, time) => fn)
}));
jest.mock("react-redux");
jest.mock("../../redux/actions/userActions", () => ({
  getUser: jest.fn(),
  resetSearch: jest.fn()
}));

/*
    A bottom-up approach to testing was used, where all the small components that make up the page have already been tested, including
    the underlying logic of async thunks/redux reducers. 
    Therefore, all that is left to test here is the user input possibilities.
*/
describe("SearchUserPage", () => {
  it("should dispatch getUser on user inputting search query", () => {
    useDispatch.mockImplementation(() => jest.fn());
    useSelector.mockImplementation(() => null);
    const searchBar = mount(<SearchUserPage />);
    const searchInput = searchBar.find("input").at(0);
    searchInput.instance().value = "user";
    searchInput.simulate("change");

    expect(debounce).toHaveBeenCalled();
    expect(getUser).toHaveBeenCalled();
  });
  it("should dispatch resetSearch on user deleting search query", () => {
    useDispatch.mockImplementation(() => jest.fn());
    useSelector.mockImplementation(() => null);
    const component = mount(<SearchUserPage />);
    const searchInput = component.find("input").at(0);
    searchInput.instance().value = "";
    searchInput.simulate("change");

    expect(debounce).toHaveBeenCalled();
    expect(resetSearch).toHaveBeenCalled();
  });
  it("should load spinner on search bar while async request is in progress", () => {
    useDispatch.mockImplementation(() => jest.fn());
    useSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(true);
    const component = mount(<SearchUserPage />);
    const searchBar = component.find("Search");

    expect(searchBar.props().loading).toBe(true);
  });
});
