import React, { Component } from "react";
import { CounterButton, CounterDisplay } from "./components";
import { observer, inject } from "mobx-react";
@inject("counter")
class App extends Component {
  render() {
    const { decrease } = this.props.counter;
    return (
      <>
        <CounterButton onClick={decrease}>-</CounterButton>
        <CounterDisplay />
      </>
    );
  }
}
export default App;
