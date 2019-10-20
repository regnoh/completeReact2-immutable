import React from "react";
import { decrease } from "./actions";
import { connect } from "react-redux";
const App = ({ count, decrease }) => {
  const onDecrease = () => {
    decrease();
  };
  return (
    <div>
      <button onClick={onDecrease}>-</button>
      <span>{count}</span>
    </div>
  );
};
const mapStateToProps = state => ({
  count: state.getIn(["counter", "count"])
});

export default connect(
  mapStateToProps,
  { decrease }
)(App);
