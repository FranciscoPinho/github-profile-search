import React from "react";
import { shallow, mount } from "enzyme";
import UserCard from "../UserCard";

const user = {
  name: "FranciscoPinho",
  profileLink: "testLink",
  profileImage: "https://identicons.github.com/jasonlong.png",
  email: "example@gmail.com",
  location: "Porto, Portugal"
};

describe("UserCard should render correctly", () => {
  it("with user", () => {
    const component = mount(<UserCard user={user} />);

    expect(component).toMatchSnapshot();
  });
  it("as null with no user", () => {
    const component = shallow(<UserCard />);

    expect(component).toMatchSnapshot();
  });
  it("with user without name attribute", () => {
    const component = shallow(
      <UserCard user={{ ...user, name: null }} />
    );

    expect(component).toMatchSnapshot();
  });
  it("with user without profileLink attribute", () => {
    const component = shallow(
      <UserCard user={{ ...user, profileLink: null }} />
    );

    expect(component).toMatchSnapshot();
  });
  it("with user without profileImage attribute", () => {
    const component = shallow(
      <UserCard user={{ ...user, profileImage: null }} />
    );

    expect(component).toMatchSnapshot();
  });
  it("with user without email attribute", () => {
    const component = shallow(
      <UserCard user={{ ...user, email: null }} />
    );

    expect(component).toMatchSnapshot();
  });
  it("with user without location attribute", () => {
    const component = shallow(
      <UserCard user={{ ...user, location: null }} />
    );

    expect(component).toMatchSnapshot();
  });
});
