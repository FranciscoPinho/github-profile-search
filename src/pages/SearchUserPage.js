import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash-es";
import { Header, Search } from "semantic-ui-react";
import { getUser, resetSearch } from "../redux/actions/userActions";
import UserCard from "../components/UserCard";
import ErrorSegment from "../components/ErrorSegment";
import { CentralContainer, ResultsContainer } from "./styles";

const debouncedSearch = debounce((value, dispatch, setDebouncedLoading) => {
  if (!value) {
    dispatch(resetSearch());
  } else {

    dispatch(getUser(value));
  }
  setDebouncedLoading(false);
}, 500);

const SearchUserPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.error);
  const user = useSelector(state => state.users.user);
  const loading = useSelector(state => state.users.loading);
  
  const [debouncedLoading, setDebouncedLoading] = useState(false);
  const [search, setSearch] = useState("");
  
  return (
    <CentralContainer>
      <Header as="h1">Search Github Users by Username</Header>
      <Search
        loading={loading || debouncedLoading}
        showNoResults={false}
        onSearchChange={(e, { value }) => {
          setSearch(value);
          setDebouncedLoading(true);
          debouncedSearch(value, dispatch, setDebouncedLoading);
        }}
        value={search}
      ></Search>
      <ResultsContainer>
        <UserCard user={user} />
      </ResultsContainer>
      <ErrorSegment error={error} />
    </CentralContainer>
  );
};

export default SearchUserPage;
