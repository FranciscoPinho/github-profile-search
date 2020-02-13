import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import SearchUserPage from "./pages/SearchUserPage";

const App = () => (
  <Provider store={store}>
    <SearchUserPage />
  </Provider>
);

export default App;
