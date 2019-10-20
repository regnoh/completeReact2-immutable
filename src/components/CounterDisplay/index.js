import React, { Component } from "react";
import { observer } from "mobx-react";
@observer
class CounterDisplay extends Component {
  render() {
    return (
      <div>
        <p>原值： {this.props.counterStore.count}</p>
        <p>*2: {this.props.counterStore.doubleCount}</p>
      </div>
    );
  }
}
export default CounterDisplay;
