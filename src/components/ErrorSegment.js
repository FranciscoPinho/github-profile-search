import React from "react";
import { Segment } from "semantic-ui-react";

const ErrorSegment = ({ error }) =>
  error ? (
    <Segment inverted color="red">
      {error}
    </Segment>
  ) : null;

export default ErrorSegment;
