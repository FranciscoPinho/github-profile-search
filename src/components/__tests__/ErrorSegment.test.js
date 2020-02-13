import React from "react";
import { shallow } from "enzyme";
import ErrorSegment from "../ErrorSegment";

const error = `Some error happened`;

describe("ErrorSegment should render correctly", () => {
  it("with error", () => {
    const component = shallow(<ErrorSegment error={error} />);

    expect(component).toMatchSnapshot();
  });
  it("as null with no error", () => {
    const component = shallow(<ErrorSegment />);

    expect(component).toMatchSnapshot();
  });
});
