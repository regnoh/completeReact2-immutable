import React, { Component } from "react";
import { CounterButton, CounterDisplay } from "./components";
import counterStore from "./store";
// window.counterStore = counterStore;
class App extends Component {
  render() {
    return (
      <>
        <CounterButton onClick={counterStore.decrease}>-</CounterButton>
        <CounterDisplay counterStore={counterStore} />
      </>
    );
  }
}
export default App;
