import React, { Component } from "react";
import { observer, inject } from "mobx-react";
@inject(store => {
  const { count, doubleCount } = store.counter;
  return {
    count,
    doubleCount
  };
})
@observer
class CounterDisplay extends Component {
  render() {
    const { doubleCount, count } = this.props;

    return (
      <div>
        <p>原值： {count}</p>
        <p>*2: {doubleCount}</p>
      </div>
    );
  }
}
export default CounterDisplay;
